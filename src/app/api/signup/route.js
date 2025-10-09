import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { encryptPassword } from "@/server/functions/encrypt";

export async function POST(request) {
    const formData = await request.json();
    const { first_name, middle_name, last_name, gender, email, phone, password } = formData;

    // If client.fetch is not available, import sanityClient from the correct location
    // import { sanityClient } from "@/sanity/schema/client";
    // const existingUser = await sanityClient.fetch(...);

    // If client supports fetch:
    const existingUser = await client.fetch(
        `*[_type == "client" && (email == $email || phone == $phone)][0]`,
        { email, phone }
        );
    if (existingUser) {
        return NextResponse.json({
            type: "fail",
            success: false,
            message: "Email or Phone number already in use"
        }, { status: 400 }) 
    }

    if(!password || password.length < 6) {
        return NextResponse.json({ 
            type: "fail",
            success: false,
            message: "Password must be at least 6 characters long"
        }, { status: 400 });
    }

    const passwordHash = await encryptPassword(password);
    const newDoc = {
        _type: "client",
        first_name: first_name,
        middle_name: middle_name,
        last_name: last_name,
        gender: gender,
        email: email,
        phone: phone,
        password: passwordHash,
    }

    try {
        const createdDoc = await client.create(newDoc);
        return NextResponse.json({ 
            type: "success",
            success: true,
            message: "Account created successfully",
            data: createdDoc
        }, { status: 201 });
    }catch (error) {
        console.error("Error creating document:", error);
        return NextResponse.json({ 
            type: "fail",
            success: false,
            message: "Error creating account",
            location: "signup_route"
        }, { status: 500 });
    }
}