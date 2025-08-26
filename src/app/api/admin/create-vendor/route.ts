// // /api/admin/create-vendor/route.ts
// import { NextResponse } from "next/server";
// import { mockUsers } from "../../../../lib/mockDB";

// export async function POST(request: Request) {
//     try {
//         const { userName, email, password } = await request.json();

//         if (!userName || !email || !password) {
//             return NextResponse.json({ message: "All fields are required" }, { status: 400 });
//         }

//         // Check if email already exists
//         const existingUser = mockUsers.find((u) => u.email === email);
//         if (existingUser) {
//             return NextResponse.json({ message: "Email already exists" }, { status: 409 });
//         }

//         // Create vendor
//         mockUsers.push({
//             userName,
//             email,
//             password, // plain for now
//             type: "vendor",
//         });

//         return NextResponse.json({ message: "Vendor created successfully" }, { status: 201 });
//     } catch (error: any) {
//         return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
//     }
// }
