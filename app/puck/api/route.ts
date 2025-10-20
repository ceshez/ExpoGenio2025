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
  // --- 1) intenta cookie 'token' (JWT custom)
  const cookieStore = await cookies();
  const custom = cookieStore.get("token")?.value;

  let userId: number | null = null;
  let userEmail: string | null = null;

  if (custom) {
    try {
      const { payload } = await jwtVerify(custom, hsSecret, { algorithms: ["HS256"] });
      userId = Number(payload.id);
    } catch {
      // si falla, seguimos y probamos NextAuth
    }
  }

  // --- 2) si no hay JWT custom válido, intenta NextAuth
  if (!userId) {
    const na = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (na?.email) {
      userEmail = na.email as string;
      const u = await prisma.user.findUnique({ where: { email: userEmail }, select: { id: true } });
      userId = u?.id ?? null;
    }
  }

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // --- 3) payload del editor
  let payload: PuckPayload;
  try {
    payload = (await req.json()) as PuckPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!payload?.path || !payload?.data) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  // --- 4) guardar por (userId, path)
  const existing = await prisma.page.findFirst({
    where: { userId, path: payload.path },
    select: { id: true },
  });

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
          userId,
        },
      });

  revalidatePath(payload.path);
  return NextResponse.json({ status: "ok", page: saved });
}
