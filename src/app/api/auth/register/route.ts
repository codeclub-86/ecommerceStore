// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { getConnection } from "../../../../../libs/mysql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { userName, email, password } = await request.json();

    if (!userName || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const db = await getConnection();

    // check existing user
    const [existing]: any = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const [result]: any = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [userName, email, hashedPassword]
    );

    const newUserId = result.insertId;

    // create JWT
    const token = jwt.sign({ id: newUserId, email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return NextResponse.json(
      {
        message: "User Created Successfully",
        user: { id: newUserId, userName, email },
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
