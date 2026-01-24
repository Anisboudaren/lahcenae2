import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // If slug provided, fetch single article
    if (slug) {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json({ error: error.message || "Article not found" }, { status: 404 });
      }
      if (!data) {
        return NextResponse.json({ error: "Article not found" }, { status: 404 });
      }
      return NextResponse.json(data);
    }

    // Otherwise, fetch all articles
    const { data, error } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message || "Failed to fetch articles" }, { status: 500 });
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
