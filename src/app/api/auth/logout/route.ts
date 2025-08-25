import { NextResponse } from "next/server";

export async function POST() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
