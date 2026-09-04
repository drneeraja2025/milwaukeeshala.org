import type { GalleryAlbum, GalleryVideo, UpdateItem } from "@/lib/data";
import { getRepoFile, putRepoFile, slugify } from "@/lib/githubContent";
import { parseYoutubeId } from "@/lib/videoEmbed";
import { redeployNote, triggerProductionRedeploy } from "@/lib/triggerRedeploy";

const MAX_IMAGE_BYTES = 3.5 * 1024 * 1024;
const MAX_DOC_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function publishOk(payload: Record<string, unknown>) {
  const redeployed = await triggerProductionRedeploy();
  return Response.json({ ok: true, ...payload, note: redeployNote(redeployed) });
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

async function uploadImageFile(
  file: File,
  folder: "news" | "gallery" | "staff" | "docs",
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
  const path = `public/media/uploads/${folder}/${stamp}-${slugify(file.name.replace(/\.[^.]+$/, "")) || "file"}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await putRepoFile({
    path,
    content: buffer,
    message: `content: upload ${folder} file`,
    binary: true,
  });
  return `/${path.replace(/^public\//, "")}`;
}

export async function handlePublish(
  form: FormData,
  _auth?: { role: "admin" | "editor" },
) {
  const kind = String(form.get("kind") || "").trim();
  const action = String(form.get("action") || "create").trim();

  if (kind === "tools") {
    if (action === "undo") return undoPublish();
    if (action === "audit") return auditLog();
    return jsonError("Unknown tools action", 400);
  }

  if (kind === "news") {
    if (action === "delete") return deleteNews(form);
    if (action === "update") return updateNews(form);
    return createNews(form);
  }
  if (kind === "photo") {
    if (action === "delete") return deletePhoto(form);
    return createPhoto(form);
  }
  if (kind === "teacher") {
    if (action === "add") return addTeacher(form);
    if (action === "delete") return deleteTeacher(form);
    return updateTeacher(form);
  }
  if (kind === "qr") return publishQr(form);
  if (kind === "video") {
    if (action === "delete") return deleteVideo(form);
    return createVideo(form);
  }
  if (kind === "settings") return updateSettings(form);
  if (kind === "announcement") return updateAnnouncement(form);
  if (kind === "resource") return addResource(form);

  return jsonError("Unknown kind", 400);
}

async function auditLog() {
  const { listRecentContentCommits } = await import("@/lib/githubContent");
  const commits = await listRecentContentCommits(20);
  return Response.json({ ok: true, commits });
}

async function undoPublish() {
  const { undoLastContentCommit } = await import("@/lib/githubContent");
  const result = await undoLastContentCommit();
  return publishOk({
    kind: "tools",
    note: `Undid: ${result.undoneMessage}`,
    commitUrl: result.commitUrl,
  });
}

async function createNews(form: FormData) {
  const title = String(form.get("title") || "").trim();
  const summary = String(form.get("summary") || "").trim();
  const body = String(form.get("body") || "").trim();
  if (!title || !summary || !body) {
    return jsonError("title, summary, and body are required", 400);
  }
  const fileRec = await getRepoFile("data/updates.json");
  const updates = JSON.parse(fileRec.content) as UpdateItem[];
  const idBase = slugify(title);
  let id = idBase;
  let n = 2;
  while (updates.some((u) => u.id === id)) id = `${idBase}-${n++}`;

  let imagePath: string | undefined;
  const file = form.get("image");
  if (file instanceof File && file.size > 0) {
    imagePath = await uploadImageFile(file, "news");
  }

  const item: UpdateItem = {
    id,
    date: String(form.get("date") || "").trim() || todayIso(),
    title,
    summary,
    body,
    ...(String(form.get("titleMr") || "").trim()
      ? { titleMr: String(form.get("titleMr")).trim() }
      : {}),
    ...(String(form.get("summaryMr") || "").trim()
      ? { summaryMr: String(form.get("summaryMr")).trim() }
      : {}),
    ...(String(form.get("bodyMr") || "").trim()
      ? { bodyMr: String(form.get("bodyMr")).trim() }
      : {}),
    ...(imagePath ? { image: imagePath } : {}),
    ...(String(form.get("publishAt") || "").trim()
      ? { publishAt: String(form.get("publishAt")).trim() }
      : {}),
  };

  const { commitUrl } = await putRepoFile({
    path: "data/updates.json",
    content: `${JSON.stringify([item, ...updates], null, 2)}\n`,
    message: `content: add news “${title.slice(0, 60)}”`,
    sha: fileRec.sha,
  });
  return publishOk({ kind: "news", id, commitUrl });
}

async function updateNews(form: FormData) {
  const id = String(form.get("id") || "").trim();
  if (!id) return jsonError("id is required", 400);
  const fileRec = await getRepoFile("data/updates.json");
  const updates = JSON.parse(fileRec.content) as UpdateItem[];
  const item = updates.find((u) => u.id === id);
  if (!item) return jsonError("News item not found", 404);

  const title = String(form.get("title") || "").trim();
  const summary = String(form.get("summary") || "").trim();
  const body = String(form.get("body") || "").trim();
  if (title) item.title = title;
  if (summary) item.summary = summary;
  if (body) item.body = body;
  const date = String(form.get("date") || "").trim();
  if (date) item.date = date;
  const titleMr = String(form.get("titleMr") || "").trim();
  const summaryMr = String(form.get("summaryMr") || "").trim();
  const bodyMr = String(form.get("bodyMr") || "").trim();
  if (titleMr) item.titleMr = titleMr;
  if (summaryMr) item.summaryMr = summaryMr;
  if (bodyMr) item.bodyMr = bodyMr;
  const publishAt = String(form.get("publishAt") || "").trim();
  if (publishAt) item.publishAt = publishAt;

  const file = form.get("image");
  if (file instanceof File && file.size > 0) {
    item.image = await uploadImageFile(file, "news");
  }

  const { commitUrl } = await putRepoFile({
    path: "data/updates.json",
    content: `${JSON.stringify(updates, null, 2)}\n`,
    message: `content: update news ${id}`,
    sha: fileRec.sha,
  });
  return publishOk({ kind: "news", id, commitUrl });
}

async function deleteNews(form: FormData) {
  const id = String(form.get("id") || "").trim();
  if (!id) return jsonError("id is required", 400);
  const fileRec = await getRepoFile("data/updates.json");
  const updates = JSON.parse(fileRec.content) as UpdateItem[];
  const next = updates.filter((u) => u.id !== id);
  if (next.length === updates.length) return jsonError("News item not found", 404);
  const { commitUrl } = await putRepoFile({
    path: "data/updates.json",
    content: `${JSON.stringify(next, null, 2)}\n`,
    message: `content: delete news ${id}`,
    sha: fileRec.sha,
  });
  return publishOk({ kind: "news", id, commitUrl });
}

async function createPhoto(form: FormData) {
  const albumId = String(form.get("albumId") || "community").trim();
  const caption = String(form.get("caption") || "").trim();
  const file = form.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return jsonError("image file is required", 400);
  }
  const imagePath = await uploadImageFile(file, "gallery");
  const fileRec = await getRepoFile("data/gallery.json");
  const gallery = JSON.parse(fileRec.content) as { albums: GalleryAlbum[]; videos: GalleryVideo[] };
  const album = gallery.albums.find((a) => a.id === albumId);
  if (!album) return jsonError(`Unknown albumId “${albumId}”`, 400);
  const alt = String(form.get("alt") || caption || "School photo").trim();
  album.photos.push({
    src: imagePath,
    alt,
    caption: caption || alt,
    ...(String(form.get("captionMr") || "").trim()
      ? { captionMr: String(form.get("captionMr")).trim() }
      : {}),
  });
  if (!album.cover) album.cover = imagePath;
  const { commitUrl } = await putRepoFile({
    path: "data/gallery.json",
    content: `${JSON.stringify(gallery, null, 2)}\n`,
    message: `content: add photo to ${albumId}`,
    sha: fileRec.sha,
  });
  return publishOk({ kind: "photo", albumId, src: imagePath, commitUrl });
}

async function deletePhoto(form: FormData) {
  const albumId = String(form.get("albumId") || "").trim();
  const src = String(form.get("src") || "").trim();
  if (!albumId || !src) return jsonError("albumId and src are required", 400);
  const fileRec = await getRepoFile("data/gallery.json");
  const gallery = JSON.parse(fileRec.content) as { albums: GalleryAlbum[]; videos: GalleryVideo[] };
  const album = gallery.albums.find((a) => a.id === albumId);
  if (!album) return jsonError("Album not found", 404);
  album.photos = album.photos.filter((p) => p.src !== src);
  const { commitUrl } = await putRepoFile({
    path: "data/gallery.json",
    content: `${JSON.stringify(gallery, null, 2)}\n`,
    message: `content: delete photo from ${albumId}`,
    sha: fileRec.sha,
  });
  return publishOk({ kind: "photo", albumId, src, commitUrl });
}

type StaffFile = {
  contacts: Array<{ name: string; role: string; roleMr?: string; phone: string; email: string | null }>;
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

async function updateTeacher(form: FormData) {
  const personId = String(form.get("personId") || "").trim();
  if (!personId) return jsonError("personId is required", 400);
  const fileRec = await getRepoFile("data/staff.json");
  const staff = JSON.parse(fileRec.content) as StaffFile;
  const person = staff.people.find((p) => p.id === personId);
  if (!person) return jsonError(`Unknown teacher id “${personId}”`, 400);

  const fields = ["name", "nameMr", "role", "roleMr", "bio", "bioMr"] as const;
  for (const f of fields) {
    const v = String(form.get(f) || "").trim();
    if (v) person[f] = v;
  }
  const file = form.get("image");
  if (file instanceof File && file.size > 0) {
    person.photo = await uploadImageFile(file, "staff");
  }
  const phone = String(form.get("phone") || "").trim();
  if (phone) {
    const contact = staff.contacts.find((c) => c.name === person.name);
    if (contact) contact.phone = phone;
  }

  const { commitUrl } = await putRepoFile({
    path: "data/staff.json",
    content: `${JSON.stringify(staff, null, 2)}\n`,
    message: `content: update teacher ${personId}`,
    sha: fileRec.sha,
  });
  return publishOk({ kind: "teacher", personId, commitUrl });
}

async function addTeacher(form: FormData) {
  const name = String(form.get("name") || "").trim();
  const role = String(form.get("role") || "").trim();
  if (!name || !role) return jsonError("name and role are required", 400);

  const fileRec = await getRepoFile("data/staff.json");
  const staff = JSON.parse(fileRec.content) as StaffFile;
  const idBase = slugify(name);
  let id = idBase;
  let n = 2;
  while (staff.people.some((p) => p.id === id)) id = `${idBase}-${n++}`;

  const person = {
    id,
    name,
    role,
    bio: String(form.get("bio") || "Bio coming soon.").trim(),
    photo: null as string | null,
    order: staff.people.length + 1,
    ...(String(form.get("nameMr") || "").trim()
      ? { nameMr: String(form.get("nameMr")).trim() }
      : {}),
    ...(String(form.get("roleMr") || "").trim()
      ? { roleMr: String(form.get("roleMr")).trim() }
      : {}),
    ...(String(form.get("bioMr") || "").trim()
      ? { bioMr: String(form.get("bioMr")).trim() }
      : {}),
  };

  const file = form.get("image");
  if (file instanceof File && file.size > 0) {
    person.photo = await uploadImageFile(file, "staff");
  }

  staff.people.push(person);
  const { commitUrl } = await putRepoFile({
    path: "data/staff.json",
    content: `${JSON.stringify(staff, null, 2)}\n`,
    message: `content: add teacher ${id}`,
    sha: fileRec.sha,
  });
  return publishOk({ kind: "teacher", personId: id, commitUrl });
}

async function deleteTeacher(form: FormData) {
  const personId = String(form.get("personId") || "").trim();
  if (!personId) return jsonError("personId is required", 400);
  const fileRec = await getRepoFile("data/staff.json");
  const staff = JSON.parse(fileRec.content) as StaffFile;
  const next = staff.people.filter((p) => p.id !== personId);
  if (next.length === staff.people.length) return jsonError("Teacher not found", 404);
  staff.people = next;
  const { commitUrl } = await putRepoFile({
    path: "data/staff.json",
    content: `${JSON.stringify(staff, null, 2)}\n`,
    message: `content: delete teacher ${personId}`,
    sha: fileRec.sha,
  });
  return publishOk({ kind: "teacher", personId, commitUrl });
}

const QR_TARGETS: Record<string, { path: string; label: string }> = {
  zelle: { path: "public/media/zelle-pay-qr.png", label: "Zelle pay QR" },
  admissions: { path: "public/media/admissions-qr.png", label: "Admissions form QR" },
};

async function publishQr(form: FormData) {
  const target = String(form.get("target") || "").trim();
  const meta = QR_TARGETS[target];
  if (!meta) return jsonError('target must be "zelle" or "admissions"', 400);
  const file = form.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return jsonError("image file is required", 400);
  }
  const existing = await getRepoFile(meta.path).catch(() => null);
  const buffer = Buffer.from(await file.arrayBuffer());
  const { commitUrl } = await putRepoFile({
    path: meta.path,
    content: buffer,
    message: `content: replace ${meta.label}`,
    sha: existing?.sha,
    binary: true,
  });
  return publishOk({ kind: "qr", target, commitUrl });
}

async function createVideo(form: FormData) {
  const title = String(form.get("title") || "").trim();
  const url = String(form.get("youtubeUrl") || "").trim();
  const youtubeId = parseYoutubeId(url);
  if (!title || !youtubeId) {
    return jsonError("title and valid YouTube URL are required", 400);
  }
  const fileRec = await getRepoFile("data/gallery.json");
  const gallery = JSON.parse(fileRec.content) as { albums: GalleryAlbum[]; videos: GalleryVideo[] };
  if (!Array.isArray(gallery.videos)) gallery.videos = [];
  const id = slugify(title);
  gallery.videos.push({
    id,
    title,
    youtubeId,
    ...(String(form.get("titleMr") || "").trim()
      ? { titleMr: String(form.get("titleMr")).trim() }
      : {}),
    ...(String(form.get("caption") || "").trim()
      ? { caption: String(form.get("caption")).trim() }
      : {}),
  });
  const { commitUrl } = await putRepoFile({
    path: "data/gallery.json",
    content: `${JSON.stringify(gallery, null, 2)}\n`,
    message: `content: add video ${id}`,
    sha: fileRec.sha,
  });
  return publishOk({ kind: "video", id, commitUrl });
}

async function deleteVideo(form: FormData) {
  const id = String(form.get("id") || "").trim();
  if (!id) return jsonError("id is required", 400);
  const fileRec = await getRepoFile("data/gallery.json");
  const gallery = JSON.parse(fileRec.content) as { albums: GalleryAlbum[]; videos: GalleryVideo[] };
  gallery.videos = (gallery.videos || []).filter((v) => v.id !== id);
  const { commitUrl } = await putRepoFile({
    path: "data/gallery.json",
    content: `${JSON.stringify(gallery, null, 2)}\n`,
    message: `content: delete video ${id}`,
    sha: fileRec.sha,
  });
  return publishOk({ kind: "video", id, commitUrl });
}

async function updateSettings(form: FormData) {
  const fileRec = await getRepoFile("data/site-settings.json");
  const settings = JSON.parse(fileRec.content) as Record<string, string>;
  for (const key of [
    "fee",
    "yearLabel",
    "schedule",
    "location",
    "admissionsFormUrl",
    "newsletterUrl",
    "whatsappUrl",
    "whatsappQrSrc",
  ]) {
    const v = String(form.get(key) || "").trim();
    if (v) settings[key] = v;
  }
  const { commitUrl } = await putRepoFile({
    path: "data/site-settings.json",
    content: `${JSON.stringify(settings, null, 2)}\n`,
    message: "content: update site settings",
    sha: fileRec.sha,
  });
  return publishOk({ kind: "settings", commitUrl });
}

async function updateAnnouncement(form: FormData) {
  const enabled = String(form.get("enabled") || "") === "true";
  const message = String(form.get("message") || "").trim();
  const messageMr = String(form.get("messageMr") || "").trim();
  const link = String(form.get("link") || "").trim();
  const linkLabel = String(form.get("linkLabel") || "").trim();
  const payload = { enabled, message, messageMr, link, linkLabel };
  const fileRec = await getRepoFile("data/announcement.json");
  const { commitUrl } = await putRepoFile({
    path: "data/announcement.json",
    content: `${JSON.stringify(payload, null, 2)}\n`,
    message: "content: update site announcement",
    sha: fileRec.sha,
  });
  return publishOk({ kind: "announcement", commitUrl });
}

async function addResource(form: FormData) {
  const title = String(form.get("title") || "").trim();
  const description = String(form.get("description") || "").trim();
  const type = String(form.get("type") || "link").trim() as "pdf" | "image" | "link";
  if (!title || !description) return jsonError("title and description are required", 400);

  let href = String(form.get("href") || "").trim();
  const file = form.get("file");
  if (file instanceof File && file.size > 0) {
    if (file.type === "application/pdf") {
      if (file.size > MAX_DOC_BYTES) {
        return jsonError("PDF must be under 8 MB", 400);
      }
      const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
      const path = `public/media/docs/${stamp}-${slugify(file.name.replace(/\.[^.]+$/, "")) || "doc"}.pdf`;
      const buffer = Buffer.from(await file.arrayBuffer());
      await putRepoFile({
        path,
        content: buffer,
        message: "content: upload resource PDF",
        binary: true,
      });
      href = `/${path.replace(/^public\//, "")}`;
    } else {
      href = await uploadImageFile(file, "docs");
    }
  }
  if (!href) return jsonError("href or file is required", 400);

  const fileRec = await getRepoFile("data/resources.json");
  const items = JSON.parse(fileRec.content) as Array<Record<string, string>>;
  const id = slugify(title);
  items.push({
    id,
    title,
    description,
    href,
    type,
    ...(String(form.get("titleMr") || "").trim()
      ? { titleMr: String(form.get("titleMr")).trim() }
      : {}),
    ...(String(form.get("descriptionMr") || "").trim()
      ? { descriptionMr: String(form.get("descriptionMr")).trim() }
      : {}),
  });
  const { commitUrl } = await putRepoFile({
    path: "data/resources.json",
    content: `${JSON.stringify(items, null, 2)}\n`,
    message: `content: add resource ${id}`,
    sha: fileRec.sha,
  });
  return publishOk({ kind: "resource", id, commitUrl });
}
