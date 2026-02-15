import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_SESSION_COOKIE = "makrr_admin_session";

export function middleware(request: NextRequest) {
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;
  if (!sessionSecret) {
    // Don't redirect /admin/login to itself (would cause redirect loop)
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextUrl.pathname !== "/admin/login"
    ) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }
  if (request.nextUrl.pathname === "/admin/login") {
    if (request.cookies.get(ADMIN_SESSION_COOKIE)?.value === sessionSecret) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (request.cookies.get(ADMIN_SESSION_COOKIE)?.value !== sessionSecret) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/login", "/admin/:path*"],
};
