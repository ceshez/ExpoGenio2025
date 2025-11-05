/**
 * This file implements a *magic* catch-all route that renders the Puck editor.
 *
 * This route exposes /puck/[...puckPath], but is disabled by middleware.ts. The middleware
 * then rewrites all URL requests ending in `/edit` to this route, allowing you to visit any
 * page in your application and add /edit to the end to spin up a Puck editor.
 *
 * This approach enables public pages to be statically rendered whilst the /puck route can
 * remain dynamic.
 *
 * NB this route is public, and you will need to add authentication
 */

//este codigo es para ver las rutas publicas sin seguridad
/*
import "@measured/puck/puck.css";
import { Client } from "./client";
import { Metadata } from "next";
import { getPage } from "../../../lib/get-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}): Promise<Metadata> {
  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;

  return {
    title: "Puck: " + path,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}) {
  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;
  const data = getPage(path);

  return <Client path={path} data={data || {}} />;
}

export const dynamic = "force-dynamic";
*/


//este codigo servira para despues cuando las rutas esten autenticadas
// app/puck/[...puckPath]/page.tsx
import "@measured/puck/puck.css";
import { Client } from "./client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageModel, type IPage } from "@/lib/mongodb/models/Page";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {

  params: Promise<{ puckPath?: string[] }>;
}) {
  // 1) Login requerido
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  // 2) Dueño actual (id en Prisma)
  const me = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!me) redirect("/login");

  // 3) NO usar params directamente: primero await
  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;

  // 4) Cargar página desde Mongo por path
  const Pages = await PageModel();
  const page = (await Pages.findOne({ path }).lean()) as IPage | null;

  // 5) Existe pero no es mía → 403
  if (page && page.userId !== me.id) redirect("/forbidden");

  // 6) Sitios recientes del dueño (para el sidebar)
  //    Solo seleccionamos campos necesarios
  const recentDocs = await Pages.find(
    { userId: me.id, isDeleted: { $ne: true } },
    { _id: 0, title: 1, path: 1, updatedAt: 1 }
  )
    .sort({ updatedAt: -1 })
    .lean();

  // 7) Render del editor
  return (
    <Client
      path={path}
      data={(page?.content as any) ?? {}}
      recentDesigns={recentDocs.map((r: any) => ({
        id: r.path,
        title: r.title || r.path,
        path: r.path,
        updatedAt: r.updatedAt ?? new Date(),
      }))}
    />
  );
}
