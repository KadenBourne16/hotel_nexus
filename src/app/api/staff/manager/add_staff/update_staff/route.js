import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request) {
    try {
        const body = await request.json();
        const { id, staff_id, first_name, middle_name, last_name, email, phone, position, password } = body;
        if (!id || !staff_id || !first_name || !last_name || !email || !phone || !position || !password) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }
        const patched = await client.patch(id).set({
            staff_id,
            first_name,
            middle_name,
            last_name,
            email,
            phone,
            position,
            password,
        }).commit();
        return NextResponse.json({ success: true, data: patched }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ success: false, message: "Failed to update staff" }, { status: 500 });
    }
}
