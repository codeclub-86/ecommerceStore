import { NextResponse } from "next/server";
import { getConnection } from "../../../../../libs/mysql";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { phone, password } = await request.json();

        if (!phone || !password) {
            return NextResponse.json({ message: "Phone and new password required" }, { status: 400 });
        }

        const db = await getConnection();
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result]: any = await db.query(
            "UPDATE web_users SET password = ? WHERE phone = ?",
            [hashedPassword, phone]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: "Phone number not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
    }
}
