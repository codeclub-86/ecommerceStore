import { NextResponse } from "next/server";
import connectDB from "../../../../libs/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // 1. Parse request body
    const { userName, email, password } = await request.json();

    if (!userName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // 2. Connect to DB
    await connectDB();

    // 3. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user
    await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User Created Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
