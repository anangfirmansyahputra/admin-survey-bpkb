import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const adminSurveyCookie = request.cookies.get("OutsiteJWT")?.value;

  if (!adminSurveyCookie) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
