import { assertStaffAuth } from "@/lib/staffAuth";
import { handlePublish, jsonError } from "@/lib/publishHandlers";

export const runtime = "nodejs";
export const maxDuration = 60;

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
    return await handlePublish(form);
  } catch (e) {
    const status = (e as { status?: number }).status;
    const message = e instanceof Error ? e.message : "Publish failed";
    return jsonError(message, typeof status === "number" ? status : 500);
  }
}
