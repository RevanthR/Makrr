import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_SESSION_COOKIE = "makrr_admin_session";
const SESSION_SECRET = "makrr-admin-2026";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    if (request.cookies.get(ADMIN_SESSION_COOKIE)?.value === SESSION_SECRET) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (request.cookies.get(ADMIN_SESSION_COOKIE)?.value !== SESSION_SECRET) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/login", "/admin/:path*"],
};
