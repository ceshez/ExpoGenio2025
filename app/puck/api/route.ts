// app/puck/api/route.ts
export const runtime = "nodejs";

import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { PageModel, type IPage } from "@/lib/mongodb/models/Page";

type PuckPayload = { path: string; data: any; title?: string };

export async function POST(req: NextRequest) {
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

  let payload: PuckPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!payload?.path || !payload?.data) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  }

  const Pages = await PageModel();

  // 👇 IMPORTANTE: usa findOne (no find) y tipa el lean
  const existing = await Pages.findOne({ path: payload.path })
    .select({ _id: 1, userId: 1, title: 1 })
    .lean<IPage | null>();

  if (existing && existing.userId !== me.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await Pages.updateOne(
    { path: payload.path },
    {
      $set: {
        userId: me.id,
        title:
          payload.title ??
          existing?.title ??
          (payload.path.replace(/^\//, "") || "Mi sitio"),
        content: payload.data, // guarda el árbol completo de Puck
        isDeleted: false,
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true }
  );

  revalidatePath(payload.path);
  return NextResponse.json({ status: "ok" });
}
