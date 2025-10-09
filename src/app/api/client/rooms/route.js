import {client} from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const rooms = await client.fetch(`*[_type == "rooms"]`);
        return NextResponse.json({
            type: "success",
            success: true,
            message: "Rooms fetched successfully",
            data: rooms,
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return NextResponse.json({
            error: "Failed to fetch rooms",
            details: error.message
        }, { status: 500 });
    }
}
