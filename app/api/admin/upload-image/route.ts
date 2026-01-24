import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { uploadImageBuffer } from "@/lib/upload-image";

const ALLOWED_FOLDERS = ["types", "articles", "images", "illustration", "certificate"] as const;
const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "images";

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    if (!ALLOWED_FOLDERS.includes(folder as (typeof ALLOWED_FOLDERS)[number])) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(jpe?g|png|gif|webp|avif)$/i)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const supabase = createServerClient();
    const url = await uploadImageBuffer(buf, file.name, folder, supabase);
    if (!url) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
    return NextResponse.json({ url });
  } catch (e) {
    const err = e instanceof Error ? e.message : "Upload failed";
    console.error("upload-image error:", e);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
