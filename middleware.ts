import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth_user")
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth/login")

  if (!authCookie && !isAuthPage) {
    const loginUrl = new URL("/auth/login", request.url)
    return NextResponse.redirect(loginUrl)
  }
  if (authCookie && isAuthPage) {
    // Si ya está logueado, redirigir al dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
