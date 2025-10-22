// app/puck/api/route.ts
export const runtime = "nodejs";

import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

type PuckPayload = { path: string; data: any; title?: string };

export async function POST(req: NextRequest) {
  // 1) Identidad con NextAuth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const me = await prisma.user.findUnique({
    where: { email: token.email },
    select: { id: true },
  });
  if (!me) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2) Payload del editor
  let payload: PuckPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!payload?.path || !payload?.data) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  // 3) Si existe, debe ser MÍO; si no, 403. Si no existe, créalo para mí.
  const existing = await prisma.page.findUnique({
    where: { path: payload.path }, // path es único global
    select: { id: true, userId: true },
  });

  if (existing && existing.userId !== me.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const saved = existing
    ? await prisma.page.update({
        where: { id: existing.id },
        data: {
          title: payload.title ?? undefined,
          content: payload.data,
        },
      })
    : await prisma.page.create({
        data: {
          title: payload.title ?? (payload.path.replace(/^\//, "") || "Mi sitio"),
          path: payload.path,
          content: payload.data,
          userId: me.id, 
        },
      });

  revalidatePath(payload.path);
  return NextResponse.json({ status: "ok", page: saved });
}
