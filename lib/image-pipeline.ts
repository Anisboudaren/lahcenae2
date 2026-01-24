import { readFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import type { SupabaseClient } from "@supabase/supabase-js";
import { MEDIA_BUCKET } from "./storage";

const RETRIES = 3;
const RETRY_DELAY_MS = 300;
const AVIF_QUALITY = 80;
const WEBP_QUALITY = 85;

/** Normalize to lowercase, replace spaces/special chars with hyphens, strip invalid. */
function sanitizeBaseName(name: string): string {
  return name
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "image";
}

function isAvifOrWebp(filePath: string): boolean {
  const e = path.extname(filePath).toLowerCase();
  return e === ".avif" || e === ".webp";
}

/** Derive storage path: e.g. "types/categorie A.jpg" + ".avif" -> "types/categorie-a.avif" */
export function toStoragePath(relativePath: string, outputExt: ".avif" | ".webp"): string {
  const dir = path.dirname(relativePath);
  const base = path.basename(relativePath, path.extname(relativePath));
  const sanitized = sanitizeBaseName(base);
  const name = sanitized || "image";
  return dir ? `${dir}/${name}${outputExt}` : `${name}${outputExt}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function withRetries<T>(
  fn: () => Promise<T>,
  label: string,
  log: (msg: string) => void
): Promise<T | null> {
  for (let i = 0; i < RETRIES; i++) {
    try {
      return await fn();
    } catch (e) {
      const err = e instanceof Error ? e.message : String(e);
      log(`${label} attempt ${i + 1}/${RETRIES} failed: ${err}`);
      if (i < RETRIES - 1) await sleep(RETRY_DELAY_MS);
    }
  }
  return null;
}

export type ProcessImageLog = (msg: string) => void;

/**
 * Process one image: skip conversion if already avif/webp, else convert (avif then webp with retries),
 * upload to Storage, return public URL. On any error: log and return null (never throw).
 */
export async function processImage(
  localAbsolutePath: string,
  relativePath: string,
  supabase: SupabaseClient,
  log: ProcessImageLog = console.warn
): Promise<string | null> {
  const normalizedRelative = relativePath.replace(/^\/+/, "").replace(/\\/g, "/");

  try {
    const buf = await readFile(localAbsolutePath);
    if (!buf || buf.length === 0) {
      log(`Empty file: ${normalizedRelative}`);
      return null;
    }

    const ext = path.extname(localAbsolutePath).toLowerCase();
    let outputBuf: Buffer;
    let outputExt: ".avif" | ".webp";
    let contentType: string;

    if (isAvifOrWebp(localAbsolutePath)) {
      try {
        await sharp(buf).metadata();
      } catch {
        log(`Could not validate avif/webp, uploading as-is: ${normalizedRelative}`);
      }
      outputBuf = buf;
      outputExt = ext === ".avif" ? ".avif" : ".webp";
      contentType = outputExt === ".avif" ? "image/avif" : "image/webp";
    } else {
      let converted: Buffer | null = null;

      converted = await withRetries(async () => {
        return sharp(buf).avif({ quality: AVIF_QUALITY }).toBuffer();
      }, `avif ${normalizedRelative}`, log);

      if (converted) {
        outputBuf = converted;
        outputExt = ".avif";
        contentType = "image/avif";
      } else {
        converted = await withRetries(async () => {
          return sharp(buf).webp({ quality: WEBP_QUALITY }).toBuffer();
        }, `webp ${normalizedRelative}`, log);
        if (!converted) {
          log(`Convert failed (avif + webp) for: ${normalizedRelative}`);
          return null;
        }
        outputBuf = converted;
        outputExt = ".webp";
        contentType = "image/webp";
      }
    }

    const storagePath = toStoragePath(normalizedRelative, outputExt);

    const { data, error } = await supabase.storage.from(MEDIA_BUCKET).upload(storagePath, outputBuf, {
      contentType,
      upsert: true,
    });

    if (error) {
      log(`Upload failed ${normalizedRelative}: ${error.message}`);
      return null;
    }

    const { data: urlData } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(data.path);
    return urlData.publicUrl;
  } catch (e) {
    const err = e instanceof Error ? e.message : String(e);
    log(`processImage error ${normalizedRelative}: ${err}`);
    return null;
  }
}
