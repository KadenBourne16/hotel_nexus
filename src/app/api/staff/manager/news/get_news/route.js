import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const update = await client.fetch(
        `*[_type == "update" && _id == $id][0]{_id, title, description, date, type}`,
        { id }
      );
      return NextResponse.json({ update }, { status: 200 });
    }
    const updates = await client.fetch(
      `*[_type == "update"] | order(date desc){
        _id, title, description, date, type
      }`
    );
    return NextResponse.json({ updates }, { status: 200 });
  } catch (err) {
    console.error("Get news error:", err);
    return NextResponse.json({ updates: [], error: "Failed to fetch updates" }, { status: 500 });
  }
}
