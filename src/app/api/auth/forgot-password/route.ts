import { NextResponse } from "next/server";
import { getConnection } from "../../../../../libs/mysql";
import { codes } from "../../../../../libs/codeStore";

import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const db = await getConnection();
    const [rows]: any = await db.query(
      "SELECT * FROM web_users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Email not found" }, { status: 404 });
    }

    // Generate a 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in memory with 10-minute expiry
    codes.set(email, { code, expiresAt: Date.now() + 10 * 60 * 1000 });

    // Send email via Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@codeclub.tech",
        pass: "Codeclub@68",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: '"CodeClub" <info@codeclub.tech>',
      to: email, // user’s email
      subject: "Password Reset Code",
      text: `Your reset code is: ${code}`,
    });

    return NextResponse.json(
      { message: "Verification code sent to email" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}

// export { codes }; // we export so verify-code can access it
