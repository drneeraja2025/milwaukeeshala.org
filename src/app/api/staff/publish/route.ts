import { assertEditorAllowed, assertStaffAuth } from "@/lib/staffAuth";
import { handlePublish, jsonError } from "@/lib/publishHandlers";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  let role: "admin" | "editor";
  try {
    ({ role } = assertStaffAuth(req));
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

  const kind = String(form.get("kind") || "").trim();
  const action = String(form.get("action") || "create").trim();
  try {
    assertEditorAllowed(kind, action, role);
  } catch (e) {
    const status = (e as { status?: number }).status === 403 ? 403 : 500;
    return jsonError(e instanceof Error ? e.message : "Forbidden", status);
  }

  try {
    return await handlePublish(form, { role });
  } catch (e) {
    const status = (e as { status?: number }).status;
    const message = e instanceof Error ? e.message : "Publish failed";
    return jsonError(message, typeof status === "number" ? status : 500);
  }
}
