import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest): NextResponse<unknown> {
  const token: string | undefined = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isLogin: boolean = pathname === "/login";
  const isProtected: boolean = pathname.startsWith("/produtos");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLogin && token) {
    return NextResponse.redirect(new URL("/produtos", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/produtos/:path*", "/login"],
};