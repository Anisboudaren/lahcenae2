import sharp from "sharp";
import type { SupabaseClient } from "@supabase/supabase-js";
import { MEDIA_BUCKET } from "./storage";
import { toStoragePath } from "./image-pipeline";

const RETRIES = 3;
const RETRY_DELAY_MS = 300;
const AVIF_QUALITY = 80;
const WEBP_QUALITY = 85;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function withRetries<T>(fn: () => Promise<T>): Promise<T | null> {
  for (let i = 0; i < RETRIES; i++) {
    try {
      return await fn();
    } catch {
      if (i < RETRIES - 1) await sleep(RETRY_DELAY_MS);
    }
  }
  return null;
}

function isAvifOrWebp(name: string): boolean {
  const e = name.split(".").pop()?.toLowerCase() ?? "";
  return e === "avif" || e === "webp";
}

/**
 * Process buffer from multipart upload: convert to avif/webp, upload to Storage.
 * folder e.g. "types" | "articles" | "images".
 * Returns public URL or null on failure.
 */
export async function uploadImageBuffer(
  buffer: Buffer,
  originalName: string,
  folder: string,
  supabase: SupabaseClient
): Promise<string | null> {
  if (!buffer?.length) return null;
  const base = originalName.replace(/\.[^.]+$/, "") || "image";
  const ext = originalName.split(".").pop()?.toLowerCase() ?? "";
  const unique = `${base}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const relPath = `${folder}/${unique}.${ext}`;

  let outputBuf: Buffer;
  let outputExt: ".avif" | ".webp";
  let contentType: string;

  try {
    if (isAvifOrWebp(originalName)) {
      try {
        await sharp(buffer).metadata();
      } catch {
        /* invalid, continue and try convert */
      }
      outputBuf = buffer;
      outputExt = ext === "avif" ? ".avif" : ".webp";
      contentType = outputExt === ".avif" ? "image/avif" : "image/webp";
    } else {
      let converted = await withRetries(() =>
        sharp(buffer).avif({ quality: AVIF_QUALITY }).toBuffer()
      );
      if (converted) {
        outputBuf = converted;
        outputExt = ".avif";
        contentType = "image/avif";
      } else {
        converted = await withRetries(() =>
          sharp(buffer).webp({ quality: WEBP_QUALITY }).toBuffer()
        );
        if (!converted) return null;
        outputBuf = converted;
        outputExt = ".webp";
        contentType = "image/webp";
      }
    }

    const storagePath = toStoragePath(relPath, outputExt);
    const { data, error } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(storagePath, outputBuf, { contentType, upsert: true });
    if (error) return null;
    const { data: urlData } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(data.path);
    return urlData.publicUrl;
  } catch {
    return null;
  }
}
