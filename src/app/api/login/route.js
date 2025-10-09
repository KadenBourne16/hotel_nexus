import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { comparePassword } from "@/server/functions/encrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Set in your env

export async function POST(request) {
  const { login, password, accountType, staffId } = await request.json();

  let query, user;

  if (accountType === "client") {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
    query = isEmail
      ? `*[_type == "client" && email == $login][0]`
      : `*[_type == "client" && phone == $login][0]`;
    user = await client.fetch(query, { login });
  } else if (accountType === "staff") {
    // Staff login by staffId or email/phone
    if (staffId) {
      query = `*[_type == "staff" && staff_id == $staffId][0]`;
      user = await client.fetch(query, { staffId });
    } else {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
      query = isEmail
        ? `*[_type == "staff" && email == $login][0]`
        : `*[_type == "staff" && phone == $login][0]`;
      user = await client.fetch(query, { login });
    }
  } else {
    return NextResponse.json({
      success: false,
      message: "Invalid account type",
    }, { status: 400 });
  }

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Account not found",
    }, { status: 404 });
  }

  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({
      success: false,
      message: "Invalid password",
    }, { status: 401 });
  }

  // Create JWT token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      phone: user.phone,
      first_name: user.first_name,
      last_name: user.last_name,
      accountType,
      ...(accountType === "staff" && { staffId: user.staffId }),
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return NextResponse.json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      email: user.email,
      phone: user.phone,
      first_name: user.first_name,
      last_name: user.last_name,
      accountType,
      ...(accountType === "staff" && { staffId: user.staffId }),
    }
  }, { status: 200 });
}
