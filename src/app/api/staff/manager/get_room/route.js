import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ room: null, error: "Missing room id" }, { status: 400 });
  }
  try {
    const room = await client.fetch(
      `*[_type == "rooms" && _id == $id][0]{
        _id,
        room_number,
        type,
        status,
        price,
        description,
        amenities,
        capacity,
        rating,
        services,
        image[]{asset->{url}}
      }`,
      { id }
    );
    return NextResponse.json({ room }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ room: null, error: "Failed to fetch room" }, { status: 500 });
  }
}
