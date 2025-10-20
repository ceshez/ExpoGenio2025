// app/api/debug/token/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// (opcional pero recomendado si usas libs Node) 
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req, 
    secret: process.env.NEXTAUTH_SECRET!, // debe existir en tu .env
  });

  if (!token) {
    return NextResponse.json({ ok: false, message: "No token found" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, token });
}
