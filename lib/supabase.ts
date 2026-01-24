import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Create Supabase client for server-side use (API routes, server actions, server components).
 * Uses service role key for full access.
 */
export function createServerClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY)");
  }

  return createSupabaseClient(url, key);
}

/**
 * Create Supabase client for client-side use (client components).
 * Uses anon key with RLS policies.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createSupabaseClient(url, key);
}
