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
const REFRESH_COOKIE = "ap_refresh";
const BACKEND_API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

// Yeh routes login ke bina nahi kholne (matches any profile path)
const isProtectedPath = (pathname) => {
  return pathname.startsWith("/profile");
};

// Yeh routes sirf logged-OUT users ke liye
const AUTH_ONLY_PREFIXES = ["/login", "/register"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;

  const hasSession = !!(accessToken || refreshToken);

  // Case 1: Protected route + session check
  const isProtected = isProtectedPath(pathname);
  if (isProtected) {
    // Agar dono tokens missing hain -> login pe redirect karo
    if (!hasSession) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("next", pathname); // login ke baad wapas yahan aao
      return NextResponse.redirect(loginUrl);
    }

    // Agar access token missing hai par refresh token hai -> silent refresh call karo
    if (!accessToken && refreshToken) {
      try {
        const refreshRes = await fetch(`${BACKEND_API}/auth/refresh`, {
          method: "POST",
          headers: {
            cookie: `${REFRESH_COOKIE}=${refreshToken}`,
          },
        });

        if (refreshRes.ok) {
          // Success! Same URL pe redirect karo taaki naye cookies ke saath render ho sake
          const response = NextResponse.redirect(new URL(req.url));
          const setCookieHeaders = refreshRes.headers.getSetCookie();
          for (const cookieStr of setCookieHeaders) {
            response.headers.append("set-cookie", cookieStr);
          }
          return response;
        }
      } catch (err) {
        console.error("Next.js middleware silent refresh failed:", err);
      }

      // Refresh failed -> clear cookies and go to login
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("next", pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(ACCESS_COOKIE);
      response.cookies.delete(REFRESH_COOKIE);
      return response;
    }
  }

  // Case 2: Auth-only route + session already hai → home page pe bhejo
  const isAuthOnly = AUTH_ONLY_PREFIXES.some((p) => pathname.startsWith(p));
  if (isAuthOnly && hasSession) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/profile/:path*",
  ],
};
