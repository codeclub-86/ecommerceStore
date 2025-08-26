import { NextResponse } from "next/server";
import connectDB from "../../../../../libs/mongodb";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        // find user with type "admin"
        const admin = await User.findOne({ email, type: "admin" }).select("+password");
        if (!admin) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }

        // check password
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // create JWT token
        const token = jwt.sign(
            { id: admin._id, type: admin.type },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );

        return NextResponse.json({
            message: "Login successful",
            token,
            admin: { id: admin._id, email: admin.email, type: admin.type },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
