import { NextResponse } from "next/server";
import { getConnection } from "../../../../../libs/mysql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const db = await getConnection();

    // 1. Find user by email
    const [rows]: any = await db.query(
      "SELECT * FROM web_users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const user = rows[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3. Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          userName: user.name, // in MySQL table we used `name`
          email: user.email,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
