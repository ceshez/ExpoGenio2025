// app/dashboard/favorites/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageModel } from "@/lib/mongodb/models/Page";
import type { IPage } from "@/lib/mongodb/models/Page";
import { FavoriteButton, TrashButton } from "../../components/Layout/PageActions";
export const runtime = "nodejs";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return <div className="p-8">No has iniciado sesión. <Link className="underline" href="/login">Login</Link></div>;

  const me = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!me) return <div className="p-8">Usuario no encontrado.</div>;

  const Pages = await PageModel();
  const docs = await Pages
    .find({ userId: me.id, isDeleted: { $ne: true }, isFavorite: true },
          { _id: 0, title: 1, path: 1, updatedAt: 1, isFavorite: 1 })
    .sort({ updatedAt: -1 })
    .lean<IPage[]>();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Favoritos</h1>

      {docs.length === 0 ? (
        <p className="text-sm text-gray-500">No tienes páginas favoritas.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map(p => (
            <li key={p.path} className="border rounded-lg p-4 bg-white flex flex-col gap-2">
              <Link href={`${p.path}/edit`} className="font-medium hover:underline">{p.title || p.path}</Link>
              <span className="text-xs text-gray-500">
                Editado {new Date(p.updatedAt ?? new Date()).toLocaleString("es-ES")}
              </span>
              <div className="flex gap-2 mt-2">
                <FavoriteButton path={p.path} isFavorite={!!p.isFavorite} />
                <TrashButton path={p.path} />
                <Link href={p.path} className="ml-auto text-sm underline">Ver</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
