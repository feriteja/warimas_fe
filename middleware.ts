// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(req: NextRequest) {
  // 1. Determine the response (Next or Redirect) based on Auth
  let response = NextResponse.next();
  const token = req.cookies.get("access_token")?.value;

  // Only check auth for /admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      response = NextResponse.redirect(new URL("/login", req.url));
    } else {
      try {
        const payload = await verifyToken(token);
        if (payload.role !== "ADMIN") {
          response = NextResponse.redirect(new URL("/not-found", req.url));
        }
      } catch {
        response = NextResponse.redirect(new URL("/login", req.url));
      }
    }
  }

  // 2. Handle Device ID (Apply to the final response, whether it's a redirect or next)
  if (!req.cookies.has("deviceId")) {
    response.cookies.set("deviceId", crypto.randomUUID(), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Match all routes to ensure deviceId is set everywhere
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
