import type { SupabaseClient } from "@supabase/supabase-js";

const MEDIA_BUCKET = "media";

/**
 * Ensures the public `media` bucket exists. Creates it if missing.
 * Folder structure (types/, articles/, images/, etc.) is implied by upload paths.
 */
export async function ensureMediaBucket(supabase: SupabaseClient): Promise<void> {
  const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) throw new Error(`Failed to list buckets: ${listErr.message}`);
  const exists = buckets?.some((b) => b.name === MEDIA_BUCKET);
  if (exists) return;

  const { error } = await supabase.storage.createBucket(MEDIA_BUCKET, {
    public: true,
  });
  if (error) {
    if (error.message?.toLowerCase().includes("already exists")) return;
    throw new Error(`Failed to create bucket "${MEDIA_BUCKET}": ${error.message}`);
  }
}

export { MEDIA_BUCKET };
