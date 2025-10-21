// app/puck/api/route.ts
export const runtime = "nodejs";

import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getToken } from "next-auth/jwt";

const hsSecret = new TextEncoder().encode(process.env.JWT_SECRET!);

type PuckPayload = { path: string; data: any; title?: string };

export async function POST(req: NextRequest) {
  // auth: cookie 'token' (custom) o NextAuth
  const cookieStore = await cookies();
  const custom = cookieStore.get("token")?.value;

  let isAuth = false;
  if (custom) {
    try { await jwtVerify(custom, hsSecret, { algorithms: ["HS256"] }); isAuth = true; } catch {}
  }
  if (!isAuth) {
    const na = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    isAuth = !!na?.email;
  }
  if (!isAuth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let payload: PuckPayload;
  try { payload = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!payload?.path || !payload?.data) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  // upsert por path (único global)
  const existing = await prisma.page.findUnique({ where: { path: payload.path }, select: { id: true } });

  const saved = existing
    ? await prisma.page.update({
        where: { id: existing.id },
        data: { title: payload.title ?? undefined, content: payload.data },
      })
    : await prisma.page.create({
        data: {
          title: payload.title ?? payload.path.replace(/^\//, ""),
          path: payload.path,
          content: payload.data,
          userId: 1, // Replace with actual userId from session or editor
        },
      });

  revalidatePath(payload.path);
  return NextResponse.json({ status: "ok", page: saved });
}

