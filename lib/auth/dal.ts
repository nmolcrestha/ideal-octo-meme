import 'server-only'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import type { SessionUser } from '@/lib/auth/definitions'
import {
  SESSION_COOKIE,
  SESSION_DURATION_MS,
  decrypt,
  encrypt,
} from '@/lib/auth/session'
import { prisma } from '@/lib/prisma'

/**
 * Data Access Layer.
 *
 * The single place that answers "who is making this request". `proxy.ts` does
 * an optimistic cookie check to keep unauthenticated traffic off the dashboard
 * cheaply, but that is a redirect convenience, not the guard — every read of
 * user data goes through here, as close to the data as possible.
 */

/** Writes the session cookie. Only callable from a Server Action or Route Handler. */
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS)
  const token = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    // Localhost is served over http in development, where `secure` would stop
    // the browser from storing the cookie at all.
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

/**
 * Reads and verifies the session without redirecting. Use this where an
 * anonymous visitor is a legitimate outcome (the login page, the site header).
 *
 * `cache` memoizes the result for the duration of one render pass, so a layout
 * and three components asking the same question cost one verification.
 */
export const getSession = cache(async () => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  return decrypt(token)
})

/** Requires a session, or redirects to login. Use this to gate a route. */
export const verifySession = cache(async () => {
  const session = await getSession()

  if (!session?.userId) {
    redirect('/login')
  }

  return { isAuth: true as const, userId: session.userId }
})

/**
 * The signed-in user, or `null`.
 *
 * A valid signature is not enough on its own: the account behind it may have
 * been deleted since the token was issued, so the id is always resolved
 * against the database. Only DTO fields are selected — `passwordHash` cannot
 * escape this module.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const session = await getSession()
  if (!session?.userId) return null

  try {
    return await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, name: true, email: true },
    })
  } catch (error) {
    console.error('Failed to load the current user', error)
    return null
  }
})

/**
 * The signed-in user, or a redirect to login. This is what dashboard code
 * should call: it fails closed if the token is valid but the account is gone.
 */
export const requireUser = cache(async (): Promise<SessionUser> => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return user
})
