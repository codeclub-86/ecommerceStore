import { NextResponse } from "next/server";
import { getConnection } from "../../../../../libs/mysql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { userName, email, password, phone } = await request.json();

    // ✅ Validate required fields
    if (!userName || !email || !password || !phone) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Validate phone number format
    if (!/^\d{11}$/.test(phone)) {
      return NextResponse.json(
        { message: "Phone number must be exactly 11 digits" },
        { status: 400 }
      );
    }

    const db = await getConnection();

    // ✅ Check if email already exists
    const [existing]: any = await db.query(
      "SELECT * FROM web_users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Insert new user (including phone)
    const [result]: any = await db.query(
      "INSERT INTO web_users (name, email, password, phone) VALUES (?, ?, ?, ?)",
      [userName, email, hashedPassword, phone]
    );

    const newUserId = result.insertId;

    // ✅ Create JWT
    const token = jwt.sign({ id: newUserId, email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return NextResponse.json(
      {
        message: "User Created Successfully",
        user: { id: newUserId, userName, email, phone },
        token,
      },
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
