// app/dashboard/deleted/page.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PageModel } from "@/lib/mongodb/models/Page";
import type { IPage } from "@/lib/mongodb/models/Page";
import { RestoreButton, DeleteForeverButton } from "../../components/Layout/PageActions";

const DAYS = 7;

function daysLeft(deletedAt?: Date | null) {
  if (!deletedAt) return DAYS;
  const diff = (Date.now() - new Date(deletedAt).getTime()) / 86400000;
  const left = Math.max(0, DAYS - Math.floor(diff));
  return left;
}

export default async function DeletedPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return <div className="p-8">No has iniciado sesión. <Link className="underline" href="/login">Login</Link></div>;

  const me = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!me) return <div className="p-8">Usuario no encontrado.</div>;

  const Pages = await PageModel();
  const docs = await Pages
    .find({ userId: me.id, isDeleted: true },
          { _id: 0, title: 1, path: 1, deletedAt: 1, updatedAt: 1 })
    .sort({ deletedAt: -1 })
    .lean<IPage[]>();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Papelera</h1>
      <p className="text-sm text-gray-500">Los elementos se eliminan automáticamente después de 7 días.</p>

      {docs.length === 0 ? (
        <p className="text-sm text-gray-500">No hay páginas en papelera.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map(p => {
            const left = daysLeft(p.deletedAt);
            const canDelete = left === 0;
            return (
              <li key={p.path} className="border rounded-lg p-4 bg-white flex flex-col gap-2">
                <div className="font-medium">{p.title || p.path}</div>
                <span className="text-xs text-gray-500">
                  En papelera desde {p.deletedAt ? new Date(p.deletedAt).toLocaleString("es-ES") : "—"}
                </span>
                <span className="text-xs">
                  Se eliminará en <b>{left}</b> {left === 1 ? "día" : "días"}.
                </span>
                <div className="flex gap-2 mt-2">
                  <RestoreButton path={p.path} />
                  <DeleteForeverButton path={p.path} />
                  {!canDelete && (
                    <span className="ml-auto text-xs text-gray-400">(espera {left} días para borrar)</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
