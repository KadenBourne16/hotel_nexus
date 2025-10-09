import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { encryptPassword } from "@/server/functions/encrypt";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const staff_id = formData.get("staff_id");
        const first_name = formData.get("first_name");
        const middle_name = formData.get("middle_name");
        const last_name = formData.get("last_name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const position = formData.get("position");
        const password = formData.get("password");
        const image = formData.get("image");

        if (!staff_id || !first_name || !last_name || !email || !phone || !position || !password) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const passwordHash = await encryptPassword(password);

        let imageRef = null;
        if (image && image.size > 0) {
            const buffer = Buffer.from(await image.arrayBuffer());
            const asset = await client.assets.upload("image", buffer, {
                filename: image.name,
                contentType: image.type || "application/octet-stream",
            });
            imageRef = { asset: { _ref: asset._id } };
        }

        const newStaff = {
            _type: "staff",
            staff_id,
            first_name,
            middle_name,
            last_name,
            email,
            phone,
            position,
            password: passwordHash,
            ...(imageRef ? { image: imageRef } : {}),
        };

        const created = await client.create(newStaff);

        return NextResponse.json({
            success: true,
            message: "Staff member added successfully",
            data: created,
        }, { status: 201 });
    } catch (err) {
        console.error("Add staff error:", err);
        return NextResponse.json({
            success: false,
            message: "Failed to add staff member",
        }, { status: 500 });
    }
}
