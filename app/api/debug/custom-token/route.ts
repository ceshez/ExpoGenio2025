// app/api/debug/custom-token/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET() {
  const c = await cookies();
  const token = c.get("token")?.value || null;
  return NextResponse.json({ token });
}
