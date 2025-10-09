import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, title, description, type, date } = body;
    if (!id || !title || !description) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }
    const patched = await client.patch(id).set({
      title,
      description,
      type: type || "announcement",
      date: date || new Date().toISOString(),
    }).commit();
    return NextResponse.json({ success: true, data: patched }, { status: 200 });
  } catch (err) {
    console.error("Update news error:", err);
    return NextResponse.json({ success: false, message: "Failed to update news" }, { status: 500 });
  }
}
