import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, type, date } = body;
    if (!title || !description) {
      return NextResponse.json({ success: false, message: "Title and description are required" }, { status: 400 });
    }
    const doc = {
      _type: "update",
      title,
      description,
      type: type || "announcement",
      date: date || new Date().toISOString(),
    };
    const created = await client.create(doc);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err) {
    console.error("Add news error:", err);
    return NextResponse.json({ success: false, message: "Failed to add news" }, { status: 500 });
  }
}
