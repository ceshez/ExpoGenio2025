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
// app/puck/[...puckPath]/page.tsx
// app/puck/[...puckPath]/page.tsx
// app/puck/[...puckPath]/page.tsx
import "@measured/puck/puck.css";
import { Client } from "./client";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ puckPath: string[] }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const me = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!me) redirect("/login");

  const { puckPath = [] } = await params;
  const path = `/${puckPath.join("/")}`;

  const page = await prisma.page.findUnique({
    where: { path }, // path único global
    select: { userId: true, content: true },
  });

  // existe pero no es mía -> 403
  if (page && page.userId !== me.id) {
    redirect("/forbidden");
  }

  // si es mía, cargo su contenido; si no existe, abro el editor vacío
  return <Client path={path} data={(page?.content as any) ?? {}} />;
}

export const dynamic = "force-dynamic";





