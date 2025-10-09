import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request) {
    try {
        const { id } = await request.json();
        if (!id) return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });
        await client.delete(id);
        return NextResponse.json({ success: true, message: "Staff deleted" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ success: false, message: "Failed to delete staff" }, { status: 500 });
    }
}
