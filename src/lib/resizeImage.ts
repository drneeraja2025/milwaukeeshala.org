/** Client-side image downscale before staff upload (keeps under size limits). */

const MAX_EDGE = 1600;
const JPEG_QUALITY = 0.85;

export async function resizeImageFile(
  file: File,
  maxEdge = MAX_EDGE,
): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  if (typeof createImageBitmap !== "function" && typeof Image === "undefined") {
    return file;
  }

  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  const scale = Math.min(1, maxEdge / Math.max(width, height));
  if (scale >= 1 && file.size < 1.2 * 1024 * 1024) {
    bitmap.close();
    return file;
  }

  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const preferJpeg = file.type === "image/jpeg" || file.type === "image/webp";
  const mime = preferJpeg ? "image/jpeg" : "image/png";
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, mime, preferJpeg ? JPEG_QUALITY : undefined),
  );
  if (!blob) return file;

  const base = file.name.replace(/\.[^.]+$/, "") || "image";
  const ext = mime === "image/png" ? "png" : "jpg";
  return new File([blob], `${base}.${ext}`, { type: mime, lastModified: Date.now() });
}

/** Resize every File under `image` / `file` keys in a FormData copy. */
export async function resizeFormImages(form: FormData): Promise<FormData> {
  const next = new FormData();
  for (const [key, value] of form.entries()) {
    if (
      (key === "image" || key === "file") &&
      value instanceof File &&
      value.size > 0 &&
      value.type.startsWith("image/")
    ) {
      next.set(key, await resizeImageFile(value));
    } else {
      next.append(key, value);
    }
  }
  return next;
}
