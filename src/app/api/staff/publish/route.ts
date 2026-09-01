import { NextResponse } from "next/server";
import type { GalleryAlbum, UpdateItem } from "@/lib/data";
import { getRepoFile, putRepoFile, slugify } from "@/lib/githubContent";
import { assertStaffAuth } from "@/lib/staffAuth";
import { redeployNote, triggerProductionRedeploy } from "@/lib/triggerRedeploy";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_IMAGE_BYTES = 3.5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

async function publishOk(payload: Record<string, unknown>) {
  const redeployed = await triggerProductionRedeploy();
  return NextResponse.json({ ok: true, ...payload, note: redeployNote(redeployed) });
}

export async function POST(req: Request) {
  try {
    assertStaffAuth(req);
  } catch (e) {
    const status = (e as { status?: number }).status === 401 ? 401 : 500;
    return jsonError(e instanceof Error ? e.message : "Unauthorized", status);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return jsonError("Expected multipart form data", 400);
  }

  try {
    const kind = String(form.get("kind") || "").trim();
    if (kind === "news") return await publishNews(form);
    if (kind === "photo") return await publishPhoto(form);
    if (kind === "teacher") return await publishTeacher(form);
    if (kind === "qr") return await publishQr(form);
    return jsonError('kind must be "news", "photo", "teacher", or "qr"', 400);
  } catch (e) {
    const status = (e as { status?: number }).status;
    const message = e instanceof Error ? e.message : "Publish failed";
    return jsonError(message, typeof status === "number" ? status : 500);
  }
}

async function publishNews(form: FormData) {
  const title = String(form.get("title") || "").trim();
  const summary = String(form.get("summary") || "").trim();
  const body = String(form.get("body") || "").trim();
  const titleMr = String(form.get("titleMr") || "").trim();
  const summaryMr = String(form.get("summaryMr") || "").trim();
  const bodyMr = String(form.get("bodyMr") || "").trim();
  const date = String(form.get("date") || "").trim() || todayIso();

  if (!title || !summary || !body) {
    return jsonError("title, summary, and body are required", 400);
  }

  let imagePath: string | undefined;
  const file = form.get("image");
  if (file instanceof File && file.size > 0) {
    imagePath = await uploadImageFile(file, "news");
  }

  const fileRec = await getRepoFile("data/updates.json");
  const updates = JSON.parse(fileRec.content) as UpdateItem[];
  if (!Array.isArray(updates)) return jsonError("updates.json is invalid", 500);

  const idBase = slugify(title);
  let id = idBase;
  let n = 2;
  while (updates.some((u) => u.id === id)) {
    id = `${idBase}-${n++}`;
  }

  const item: UpdateItem = {
    id,
    date,
    title,
    summary,
    body,
    ...(titleMr ? { titleMr } : {}),
    ...(summaryMr ? { summaryMr } : {}),
    ...(bodyMr ? { bodyMr } : {}),
    ...(imagePath ? { image: imagePath } : {}),
  };

  const next = [item, ...updates];
  const { commitUrl } = await putRepoFile({
    path: "data/updates.json",
    content: `${JSON.stringify(next, null, 2)}\n`,
    message: `content: add news “${title.slice(0, 60)}”`,
    sha: fileRec.sha,
  });

  return publishOk({
    kind: "news",
    id,
    image: imagePath || null,
    commitUrl: commitUrl || null,
  });
}

async function publishPhoto(form: FormData) {
  const albumId = String(form.get("albumId") || "community").trim() || "community";
  const caption = String(form.get("caption") || "").trim();
  const captionMr = String(form.get("captionMr") || "").trim();
  const alt = String(form.get("alt") || caption || "School photo").trim();
  const altMr = String(form.get("altMr") || "").trim();
  const file = form.get("image");

  if (!(file instanceof File) || file.size === 0) {
    return jsonError("image file is required", 400);
  }

  const imagePath = await uploadImageFile(file, "gallery");
  const fileRec = await getRepoFile("data/gallery.json");
  const gallery = JSON.parse(fileRec.content) as {
    albums: GalleryAlbum[];
    videos: unknown[];
  };
  if (!gallery?.albums || !Array.isArray(gallery.albums)) {
    return jsonError("gallery.json is invalid", 500);
  }

  const album = gallery.albums.find((a) => a.id === albumId);
  if (!album) {
    return jsonError(`Unknown albumId “${albumId}”. Use an existing album id.`, 400);
  }

  album.photos.push({
    src: imagePath,
    alt,
    caption: caption || alt,
    ...(altMr ? { altMr } : {}),
    ...(captionMr ? { captionMr } : {}),
  });
  if (!album.cover) album.cover = imagePath;

  const { commitUrl } = await putRepoFile({
    path: "data/gallery.json",
    content: `${JSON.stringify(gallery, null, 2)}\n`,
    message: `content: add photo to ${albumId}`,
    sha: fileRec.sha,
  });

  return publishOk({
    kind: "photo",
    albumId,
    src: imagePath,
    commitUrl: commitUrl || null,
  });
}

type StaffFile = {
  contacts: Array<{
    name: string;
    role: string;
    roleMr?: string;
    phone: string;
    email: string | null;
  }>;
  people: Array<{
    id: string;
    name: string;
    nameMr?: string;
    role: string;
    roleMr?: string;
    bio: string;
    bioMr?: string;
    photo: string | null;
    order: number;
  }>;
  notes?: string[];
  notesMr?: string[];
};

async function publishTeacher(form: FormData) {
  const personId = String(form.get("personId") || "").trim();
  if (!personId) return jsonError("personId is required", 400);

  const name = String(form.get("name") || "").trim();
  const nameMr = String(form.get("nameMr") || "").trim();
  const role = String(form.get("role") || "").trim();
  const roleMr = String(form.get("roleMr") || "").trim();
  const bio = String(form.get("bio") || "").trim();
  const bioMr = String(form.get("bioMr") || "").trim();
  const phone = String(form.get("phone") || "").trim();

  const fileRec = await getRepoFile("data/staff.json");
  const staff = JSON.parse(fileRec.content) as StaffFile;
  if (!staff?.people || !Array.isArray(staff.people)) {
    return jsonError("staff.json is invalid", 500);
  }

  const person = staff.people.find((p) => p.id === personId);
  if (!person) {
    return jsonError(`Unknown teacher id “${personId}”`, 400);
  }

  if (name) person.name = name;
  if (nameMr) person.nameMr = nameMr;
  if (role) person.role = role;
  if (roleMr) person.roleMr = roleMr;
  if (bio) person.bio = bio;
  if (bioMr) person.bioMr = bioMr;

  const file = form.get("image");
  if (file instanceof File && file.size > 0) {
    person.photo = await uploadImageFile(file, "staff");
  }

  if (phone && Array.isArray(staff.contacts)) {
    const contact = staff.contacts.find(
      (c) => c.name === person.name || c.name === (name || person.name),
    );
    if (contact) contact.phone = phone;
  }

  const { commitUrl } = await putRepoFile({
    path: "data/staff.json",
    content: `${JSON.stringify(staff, null, 2)}\n`,
    message: `content: update teacher ${personId}`,
    sha: fileRec.sha,
  });

  return publishOk({
    kind: "teacher",
    personId,
    photo: person.photo,
    commitUrl: commitUrl || null,
  });
}

const QR_TARGETS: Record<string, { path: string; label: string }> = {
  zelle: { path: "public/media/zelle-pay-qr.png", label: "Zelle pay QR" },
  admissions: {
    path: "public/media/admissions-qr.png",
    label: "Admissions form QR",
  },
};

async function publishQr(form: FormData) {
  const target = String(form.get("target") || "").trim();
  const meta = QR_TARGETS[target];
  if (!meta) {
    return jsonError('target must be "zelle" or "admissions"', 400);
  }

  const file = form.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return jsonError("image file is required", 400);
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return jsonError("Image must be JPEG, PNG, or WebP", 400);
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return jsonError("Image must be under 3.5 MB", 400);
  }

  // Keep stable public URLs used by site.ts / admissions page.
  const existing = await getRepoFile(meta.path).catch(() => null);
  const buffer = Buffer.from(await file.arrayBuffer());
  const { commitUrl } = await putRepoFile({
    path: meta.path,
    content: buffer,
    message: `content: replace ${meta.label}`,
    sha: existing?.sha,
    binary: true,
  });

  return publishOk({
    kind: "qr",
    target,
    src: `/${meta.path.replace(/^public\//, "")}`,
    commitUrl: commitUrl || null,
  });
}

async function uploadImageFile(
  file: File,
  folder: "news" | "gallery" | "staff",
): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw Object.assign(new Error("Image must be JPEG, PNG, or WebP"), { status: 400 });
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw Object.assign(new Error("Image must be under 3.5 MB"), { status: 400 });
  }

  const ext =
    file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const path = `public/media/uploads/${folder}/${stamp}-${slugify(file.name.replace(/\.[^.]+$/, "")) || "photo"}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await putRepoFile({
    path,
    content: buffer,
    message: `content: upload ${folder} image`,
    binary: true,
  });

  return `/${path.replace(/^public\//, "")}`;
}
