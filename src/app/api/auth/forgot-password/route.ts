import { NextResponse } from "next/server";
import { getConnection } from "../../../../../libs/mysql";

export async function POST(request: Request) {
    try {
        const { phone } = await request.json();
        if (!phone) {
            return NextResponse.json({ message: "Phone is required" }, { status: 400 });
        }

        const db = await getConnection();
        const [rows]: any = await db.query("SELECT * FROM web_users WHERE phone = ?", [phone]);

        if (rows.length === 0) {
            return NextResponse.json({ message: "Phone number not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Phone verified" }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
    }
}