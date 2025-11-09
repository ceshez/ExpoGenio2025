// app/dashboard/favorites/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageModel } from "@/lib/mongodb/models/Page";
import FavoritesClient from "./FavoritesClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return (
      <div className="p-8 text-center">
        <p>No has iniciado sesión.</p>
        <Link href="/login" className="text-purple-600 underline">Ir al login</Link>
      </div>
    );
  }

  const me = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!me) return <div className="p-8 text-center">Usuario no encontrado.</div>;

  const Pages = await PageModel();


  const recentDocs = await Pages.find(
    { userId: me.id, isDeleted: { $ne: true } },
    { _id: 0, title: 1, path: 1, updatedAt: 1, isFavorite: 1 }
  ).sort({ updatedAt: -1 }).lean();


  const favDocs = await Pages.find(
    { userId: me.id, isDeleted: { $ne: true }, isFavorite: true },
    { _id: 0, title: 1, path: 1, updatedAt: 1, isFavorite: 1 }
  ).sort({ updatedAt: -1 }).lean();

  const fmt = new Intl.DateTimeFormat("es-CR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Costa_Rica",
  });

  const recentDesigns = recentDocs.map((d: any) => ({
    id: d.path,
    title: d.title || d.path.replace("/", ""),
    path: d.path,
    updatedAtText: fmt.format(new Date(d.updatedAt)),
    isFavorite: !!d.isFavorite, 
  }));

  const favorites = favDocs.map((d: any) => ({
    id: d.path,
    title: d.title || d.path.replace("/", ""),
    path: d.path,
    updatedAtText: fmt.format(new Date(d.updatedAt)),
    isFavorite: true,
  }));

  return <FavoritesClient recentDesigns={recentDesigns} favorites={favorites} />;
}
