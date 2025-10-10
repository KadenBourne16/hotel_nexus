import { NextResponse } from "next/server";
import {client} from "@/sanity/lib/client";

export async function POST(request) {
    try {
        console.log('POST request received for getbooking');

        const body = await request.json();
        console.log('Request body:', body);

        const { user_id } = body;
        console.log('User ID from request:', user_id);

        if (!user_id) {
            console.log('No user_id provided');
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        console.log('Querying Sanity for bookings with user_id:', user_id);
        const bookings = await client.fetch(`*[_type == "booking" && client._ref == $user_id]`, {user_id});
        console.log('Bookings found:', bookings);

        return NextResponse.json({
            type: "success",
            success: true,
            message: "Bookings fetched successfully",
            status: 200,
            data: bookings
        });
    } catch (error) {
        console.error("Error in getbooking API:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}