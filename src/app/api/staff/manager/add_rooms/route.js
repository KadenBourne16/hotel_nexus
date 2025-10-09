import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

// Robust helper to convert various file shapes to Buffer
async function fileToBuffer(file) {
  if (!file) throw new Error("No file provided");

  // If already a Node Buffer
  if (Buffer.isBuffer(file)) return file;

  // If a File/Blob with arrayBuffer()
  if (typeof file.arrayBuffer === "function") {
    const ab = await file.arrayBuffer();
    return Buffer.from(ab);
  }

  // Try using Response adapter (works in many environments)
  try {
    const ab = await new Response(file).arrayBuffer();
    return Buffer.from(ab);
  } catch (err) {
    // fallthrough
  }

  // If file.stream() exists (web/Node streams), consume it
  if (typeof file.stream === "function") {
    const stream = file.stream();
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
  }

  // Some environments expose a buffer property
  if (file.buffer) return file.buffer;

  throw new Error("Cannot convert file to buffer");
}

// Helper to upload images to Sanity
async function uploadImages(files) {
  const uploaded = [];
  for (const file of files) {
    if (!file || (typeof file.size === "number" && file.size === 0) || !file.name) continue;
    const buffer = await fileToBuffer(file);
    const asset = await client.assets.upload("image", buffer, {
      filename: file.name,
      contentType: file.type || "application/octet-stream",
    });
    uploaded.push({ asset: { _ref: asset._id } });
  }
  return uploaded;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const room_number = formData.get("room_number");
    const type = formData.get("type");
    const status = formData.get("status");
    const price = Number(formData.get("price"));
    const description = formData.get("description");
    const capacity = Number(formData.get("capacity"));
    const rating = Number(formData.get("rating"));
    // Get amenities/services as arrays
    const amenities = formData.getAll("amenities");
    const services = formData.getAll("services");
    // Get images
    const images = formData.getAll("image");

    // Upload images to Sanity
    let imageRefs = [];
    if (images && images.length > 0) {
      imageRefs = await uploadImages(images);
    }

    const newRoom = {
      _type: "rooms",
      room_number,
      type,
      status,
      price,
      description,
      amenities,
      capacity,
      rating,
      services,
      image: imageRefs,
    };

    const created = await client.create(newRoom);

    return NextResponse.json({
      success: true,
      message: "Room added successfully",
      data: created,
    }, { status: 201 });
  } catch (err) {
    console.error("Add room error:", err);
    return NextResponse.json({
      success: false,
      message: "Failed to add room",
    }, { status: 500 });
  }
}
