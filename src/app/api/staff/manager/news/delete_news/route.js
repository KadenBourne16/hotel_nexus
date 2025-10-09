import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });
    await client.delete(id);
    return NextResponse.json({ success: true, message: "Deleted" }, { status: 200 });
  } catch (err) {
    console.error("Delete news error:", err);
    return NextResponse.json({ success: false, message: "Failed to delete" }, { status: 500 });
  }
}
