import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const pathname = req.nextUrl.pathname

  // These paths are always public (even if logged in)
  const alwaysPublicPaths = ['/verify']

  // These are public *only* for guests (not logged in)
  const guestOnlyPaths = ['/login', '/register']

  // Allow access to `/verify` without any redirect
  if (alwaysPublicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // If user is logged in and tries to access guest-only pages, redirect to home
  if (guestOnlyPaths.some(path => pathname.startsWith(path)) && token) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // If trying to access protected route without token, redirect to login
  const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/users') || pathname === '/'
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/register', '/verify', '/dashboard/:path*', '/users/:path*'],
}