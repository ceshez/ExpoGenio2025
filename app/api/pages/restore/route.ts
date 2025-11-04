// app/api/pages/restore/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageModel } from "@/lib/mongodb/models/Page";

export async function POST(req: Request) {
  const { path } = await req.json() as { path: string };

  if (!path) return NextResponse.json({ error: "Falta path" }, { status: 400 });

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "No auth" }, { status: 401 });

  const me = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!me) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  const Pages = await PageModel();
  const updated = await Pages.findOneAndUpdate(
    { path, userId: me.id, isDeleted: true },
    { $set: { isDeleted: false, deletedAt: null } },
    { new: true }
  );

  if (!updated) return NextResponse.json({ error: "Página no encontrada" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
