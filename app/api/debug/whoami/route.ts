import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  const jar = await cookies();
  const token = jar.get("token")?.value;

  if (!token) return NextResponse.json({ ok:false, reason:"no-token" });

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret, { algorithms:["HS256"] });
    return NextResponse.json({ ok:true, payload });
  } catch (e:any) {
    return NextResponse.json({ ok:false, reason:e?.message || "verify-failed" }, { status:401 });
  }
}
