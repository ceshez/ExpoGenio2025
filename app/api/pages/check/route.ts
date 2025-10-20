// app/api/pages/check/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { toSlug } from "@/lib/slug";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "";
  const slug = toSlug(title);

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (!user) {
    return NextResponse.json({ ok: false, reason: "user-not-found" }, { status: 404 });
  }

  const exists = await prisma.page.findFirst({
    where: { userId: user.id, path: slug },
    select: { id: true },
  });

  return NextResponse.json({
    ok: true,
    slug,
    available: !exists,
  });
}
