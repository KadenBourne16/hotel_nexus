import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("API received booking request:", body);

    const { roomId, checkIn, checkOut, clientId } = body;

    // Validate required fields with better error reporting
    if (!roomId || roomId.trim() === '') {
      console.error("roomId is missing or empty");
      return NextResponse.json(
        { error: "Room ID is required" },
        { status: 400 }
      );
    }

    if (!checkIn || checkIn.trim() === '') {
      console.error("checkIn is missing or empty");
      return NextResponse.json(
        { error: "Check-in date is required" },
        { status: 400 }
      );
    }

    if (!checkOut || checkOut.trim() === '') {
      console.error("checkOut is missing or empty");
      return NextResponse.json(
        { error: "Check-out date is required" },
        { status: 400 }
      );
    }

    if (!clientId || clientId.trim() === '') {
      console.error("clientId is missing or empty");
      return NextResponse.json(
        { error: "Client ID is required" },
        { status: 400 }
      );
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log("Date validation:", {
      checkIn,
      checkOut,
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      today: today.toISOString(),
      isCheckInValid: !isNaN(checkInDate.getTime()),
      isCheckOutValid: !isNaN(checkOutDate.getTime()),
      isCheckInAfterToday: checkInDate >= today,
      isCheckOutAfterCheckIn: checkOutDate > checkInDate
    });

    if (isNaN(checkInDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid check-in date format" },
        { status: 400 }
      );
    }

    if (isNaN(checkOutDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid check-out date format" },
        { status: 400 }
      );
    }

    if (checkInDate < today) {
      return NextResponse.json(
        { error: "Check-in date cannot be in the past" },
        { status: 400 }
      );
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: "Check-out date must be after check-in date" },
        { status: 400 }
      );
    }

    // Check if room exists and is available
    const room = await client.fetch(
      `*[_type == "rooms" && _id == $roomId][0]`,
      { roomId }
    );

    if (!room) {
      return NextResponse.json(
        { error: "Room not found" },
        { status: 404 }
      );
    }

    if (room.status !== "available") {
      return NextResponse.json(
        { error: "Room is not available for booking" },
        { status: 400 }
      );
    }

    // Check if client exists
    const clientUser = await client.fetch(
      `*[_type == "client" && _id == $clientId][0]`,
      { clientId }
    );

    if (!clientUser) {
      return NextResponse.json(
        { error: "Client not found" },
        { status: 404 }
      );
    }

    // Check for existing bookings that conflict with the requested dates
    const conflictingBookings = await client.fetch(
      `*[_type == "booking" && room._ref == $roomId && status in ["booked", "checked_in"] && ((check_in <= $checkOut && check_out >= $checkIn))]`,
      { roomId, checkIn, checkOut }
    );

    if (conflictingBookings.length > 0) {
      return NextResponse.json(
        { error: "Room is already booked for the selected dates" },
        { status: 400 }
      );
    }

    // Create the booking
    const booking = {
      _type: "booking",
      client: {
        _type: "reference",
        _ref: clientId,
      },
      room: {
        _type: "reference",
        _ref: roomId,
      },
      check_in: checkIn,
      check_out: checkOut,
      status: "booked",
      created_at: new Date().toISOString(),
    };

    console.log("Creating booking:", booking);

    const result = await client.create(booking);
    console.log("Booking created successfully:", result);

    // Update room status to occupied
    await client.patch(roomId).set({ status: "occupied" }).commit();
    console.log("Room status updated to occupied");

    return NextResponse.json(
      {
        success: true,
        booking: result,
        message: "Booking created successfully"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
