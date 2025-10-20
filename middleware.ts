// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtVerify } from "jose";

const COOKIE_NAME = "token"; // tu cookie custom (login)
const hsSecret = new TextEncoder().encode(process.env.JWT_SECRET!); // HS256

async function hasCustomToken(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, hsSecret, { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // No interceptar APIs/estáticos
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Acepta sesión de NextAuth o cookie 'token'
  const naToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const customOK = await hasCustomToken(req);
  const isAuth = !!naToken || customOK;

  // /cualquier-cosa/edit => /puck/cualquier-cosa (si está auth)
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

  // Proteger /puck/*
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

