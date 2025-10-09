import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

// Helper to convert file to buffer (compatible with both edge and node environments)
async function fileToBuffer(file) {
  if (file.arrayBuffer) {
    const buffer = await file.arrayBuffer();
    return Buffer.from(buffer);
  }
  // fallback for environments where arrayBuffer is not available
  if (file.buffer) {
    return file.buffer;
  }
  throw new Error("Cannot convert file to buffer");
}

// Helper to upload images to Sanity
async function uploadImages(files) {
  const uploaded = [];
  for (const file of files) {
    const buffer = await fileToBuffer(file);
    const asset = await client.assets.upload("image", buffer, {
      filename: file.name,
      contentType: file.type,
    });
    uploaded.push({ asset: { _ref: asset._id } });
  }
  return uploaded;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const id = formData.get("id");
    const room_number = formData.get("room_number");
    const type = formData.get("type");
    const status = formData.get("status");
    const price = Number(formData.get("price"));
    const description = formData.get("description");
    const capacity = Number(formData.get("capacity"));
    const rating = Number(formData.get("rating"));
    const amenities = formData.getAll("amenities");
    const services = formData.getAll("services");
    const images = formData.getAll("image");

    // Upload new images to Sanity
    let imageRefs = [];
    if (images && images.length > 0) {
      imageRefs = await uploadImages(images);
    }

    const patch = {
      room_number,
      type,
      status,
      price,
      description,
      amenities,
      capacity,
      rating,
      services,
    };
    if (imageRefs.length > 0) {
      patch.image = imageRefs;
    }

    const updated = await client.patch(id).set(patch).commit();

    return NextResponse.json({
      success: true,
      message: "Room updated successfully",
      data: updated,
    }, { status: 200 });
  } catch (err) {
    console.error("Update room error:", err);
    return NextResponse.json({
      success: false,
      message: "Failed to update room",
    }, { status: 500 });
  }
}
