import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("license_types").select("*").order("code");
    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message || "Failed to fetch license types" }, { status: 500 });
    }
    return NextResponse.json(data || []);
  } catch (e) {
    const err = e instanceof Error ? e.message : "Internal server error";
    console.error("API error:", e);
    if (err.includes("Missing")) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
