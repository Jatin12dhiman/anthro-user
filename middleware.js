import { NextResponse } from "next/server";

/**
 * anthro-user — Route protection middleware.
 *
 * Kaam:
 *  1. /login       → already logged in = / (home) redirect
 *
 * Note: Sirf cookie PRESENCE check yahan — actual JWT verify server
 * components mein `getServerUser()` se hoti hai (Edge pe DB nahi chalta).
 */

const ACCESS_COOKIE = "ap_access";

// Yeh routes login ke bina nahi kholne
const PROTECTED_PREFIXES = [];

// Yeh routes sirf logged-OUT users ke liye
const AUTH_ONLY_PREFIXES = ["/login", "/register"];

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(ACCESS_COOKIE)?.value;

  // Case 1: Protected route + no token → login pe bhejo
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname); // login ke baad wapas yahan aao
    return NextResponse.redirect(loginUrl);
  }

  // Case 2: Auth-only route + token already hai → home page pe bhejo
  const isAuthOnly = AUTH_ONLY_PREFIXES.some((p) => pathname.startsWith(p));
  if (isAuthOnly && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
  ],
};
