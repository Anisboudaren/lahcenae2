import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

const SITE_SETTINGS_ID = "00000000-0000-0000-0000-000000000001";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", SITE_SETTINGS_ID).single();
  if (error) {
    if (error.code === "PGRST116") return NextResponse.json(null);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const supabase = createServerClient();
  const body = await request.json();
  const { data, error } = await supabase
    .from("site_settings")
    .upsert({ id: SITE_SETTINGS_ID, ...body }, { onConflict: "id" })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
