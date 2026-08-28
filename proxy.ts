import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { SESSION_COOKIE, decrypt } from '@/lib/auth/session'

/**
 * Optimistic auth routing.
 *
 * Named `proxy` because the `middleware` file convention is deprecated as of
 * Next.js 16 — same behaviour, new name.
 *
 * This runs on every matched request, prefetches included, so it only reads
 * and verifies the cookie. It never touches the database: that check belongs
 * next to the data, in lib/auth/dal.ts, which is the actual guard. This is
 * here so an unauthenticated visitor gets a redirect instead of rendering a
 * dashboard shell that would bounce them a moment later.
 */

/** Everything below these prefixes requires a session. */
const PROTECTED_PREFIXES = ['/dashboard']

/** Signing in while already signed in is a no-op worth short-circuiting. */
const AUTH_ROUTES = ['/login']

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  // Nothing to decide on the marketing pages — skip the verification entirely.
  if (!isProtected && !isAuthRoute) {
    return NextResponse.next()
  }

  const session = await decrypt(req.cookies.get(SESSION_COOKIE)?.value)

  if (isProtected && !session?.userId) {
    const loginUrl = new URL('/login', req.nextUrl)
    // Carry the destination so signing in resumes where they were headed.
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  // Without a matcher this would also run for static assets and image
  // optimization, where an auth redirect would break CSS, JS and icons.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\.(?:png|jpg|jpeg|svg|gif|webp|ico)$).*)',
  ],
}
