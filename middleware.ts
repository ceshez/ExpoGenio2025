// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }
  // Usa SOLO NextAuth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;

  if (pathname.endsWith("/edit")) {
    if (!isAuth) {
      const u = new URL("/login", req.url);
      u.searchParams.set("callbackUrl", pathname + search);
      return NextResponse.redirect(u);
    }
    const withoutEdit = pathname.replace(/\/edit$/, "") || "/";
    const target = new URL(`/puck${withoutEdit}${search}`, req.url);
    return NextResponse.rewrite(target);
  }
  // Proteger ruta /puck/*
  if (pathname.startsWith("/puck")) {
    if (!isAuth) {
      const u = new URL("/login", req.url);
      u.searchParams.set("callbackUrl", pathname + search);
      return NextResponse.redirect(u);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
