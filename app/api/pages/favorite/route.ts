// app/api/pages/favorite/route.ts
export const runtime = "nodejs";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageModel } from "@/lib/mongodb/models/Page";
import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return new Response("Unauthorized", { status: 401 });

  const me = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!me) return new Response("User not found", { status: 404 });

  const { path } = await req.json();
  if (!path) return new Response("Missing path", { status: 400 });

  const Pages = await PageModel();
  const doc = await Pages.findOne({ userId: me.id, path });
  if (!doc) return new Response("Page not found", { status: 404 });

  const newVal = !Boolean(doc.isFavorite);

  await Pages.updateOne(
    { _id: doc._id },
    { $set: { isFavorite: newVal } }
  );

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/favorites");

  return new Response(JSON.stringify({ ok: true, isFavorite: newVal }), { status: 200 });
}
