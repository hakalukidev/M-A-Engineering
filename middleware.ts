import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

/**
 * Edge-safe fast path only — just checks the session cookie is present.
 * firebase-admin can't run on the Edge runtime, so this can't verify the
 * cookie; the authoritative check is requireAdmin() in
 * src/app/admin/(protected)/layout.tsx, which runs on every protected
 * request regardless of what happens here.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();

  const hasSession = request.cookies.has(SESSION_COOKIE_NAME);
  if (!hasSession) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
