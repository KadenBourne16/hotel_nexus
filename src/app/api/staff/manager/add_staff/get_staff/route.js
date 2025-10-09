import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req) {
  try {
    //get all registered staff
    const { searchParams } = new URL(req.url);

    const query = `*[_type == "staff"]`;
    const all_available_staff = await client.fetch(query);
    return NextResponse.json({
        type: "success",
        success: true,
        message:" Staff fetched successfully",
        data: all_available_staff
    }, { status: 200 });
  } catch (err) {
    console.error("Get staff error:", err);
    return NextResponse.json({ staff: [], error: "Failed to fetch staff" }, { status: 500 });
  }
}