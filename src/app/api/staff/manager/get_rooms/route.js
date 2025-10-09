import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
  try {
    const rooms = await client.fetch(
      `*[_type == "rooms"]{
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
        image[]{asset->{
          url
        }}
      }`
    );
    return NextResponse.json({ rooms }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ rooms: [], error: "Failed to fetch rooms" }, { status: 500 });
  }
}
