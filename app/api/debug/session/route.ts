import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: Request) {
  const token = await getToken({ req: req as unknown as NextRequest, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ ok: false, message: "No token found" });
  }

  return NextResponse.json({
    ok: true,
    token,
  });
}
