import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware({ nextUrl, cookies, url }: NextRequest) {
  const token: string | undefined = cookies.get("token")?.value;
  const { pathname } = nextUrl;

  const isLogin: boolean = pathname === "/login";
  const isProdutos: boolean = pathname.startsWith("/produtos");

  if (!token && isProdutos) {
    return NextResponse.redirect(new URL("/login", url));
  }

  if (token && isLogin) {
    return NextResponse.redirect(new URL("/produtos", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/produtos/:path*", "/login"],
};