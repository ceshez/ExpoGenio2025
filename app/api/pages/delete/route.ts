// app/api/pages/delete/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageModel } from "@/lib/mongodb/models/Page";

const DAYS = 7;

export async function POST(req: Request) {
  const { path, force } = await req.json() as { path: string; force?: boolean };

  if (!path) return NextResponse.json({ error: "Falta path" }, { status: 400 });

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "No auth" }, { status: 401 });

  const me = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!me) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  const Pages = await PageModel();
  const doc = await Pages.findOne({ path, userId: me.id });

  if (!doc) return NextResponse.json({ error: "Página no encontrada" }, { status: 404 });
  if (!doc.isDeleted) return NextResponse.json({ error: "La página no está en papelera" }, { status: 400 });

  const canDelete =
    force ||
    (doc.deletedAt ? (Date.now() - new Date(doc.deletedAt).getTime()) / 86400000 >= DAYS : false);

  if (!canDelete) {
    return NextResponse.json({ error: "Aún no cumple 7 días en papelera" }, { status: 400 });
  }

  await Pages.deleteOne({ _id: doc._id });
  return NextResponse.json({ ok: true });
}
