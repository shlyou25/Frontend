// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Protect all admin routes
  if (req.nextUrl.pathname.startsWith("/jmwbZbnwyrtiB71oTHBopM2wZ")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/jmwbZbnwyrtiB71oTHBopM2wZ/:path*"],
};
