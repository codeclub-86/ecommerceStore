import { NextResponse } from "next/server";
import { codes } from "../forgot-password/route";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { message: "Email and code are required" },
        { status: 400 }
      );
    }

    const record = codes.get(email);
    if (!record) {
      return NextResponse.json(
        { message: "No verification code found" },
        { status: 404 }
      );
    }

    if (Date.now() > record.expiresAt) {
      codes.delete(email);
      return NextResponse.json(
        { message: "Verification code expired" },
        { status: 400 }
      );
    }

    if (record.code !== code) {
      return NextResponse.json(
        { message: "Invalid verification code" },
        { status: 400 }
      );
    }

    // verification successful — remove code
    codes.delete(email);
    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
