import { SignJWT, jwtVerify } from 'jose'

import type { SessionPayload } from '@/lib/auth/definitions'

/**
 * Session token encode/decode.
 *
 * This module is imported by `proxy.ts` as well as by the app, so it stays
 * free of `next/headers` and of `server-only`: it does pure crypto and knows
 * nothing about how the token is transported. Cookie handling lives in
 * `lib/auth/dal.ts`.
 */

export const SESSION_COOKIE = 'session'

/** Seven days, in milliseconds — the cookie and the JWT must not disagree. */
export const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000

function getEncodedKey() {
  const secret = process.env.SESSION_SECRET

  // Failing loudly at first use beats signing tokens with `undefined`, which
  // jose would happily accept as an empty key and anyone could then forge.
  if (!secret) {
    throw new Error(
      'SESSION_SECRET is not set. Generate one with `openssl rand -base64 32` and add it to .env',
    )
  }

  return new TextEncoder().encode(secret)
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT({ ...payload, expiresAt: payload.expiresAt.toISOString() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt)
    .sign(getEncodedKey())
}

/**
 * Returns the payload of a valid, unexpired token, or `null`. Never throws for
 * a bad token — a tampered or stale cookie is an expected condition on a
 * public endpoint, not an error worth taking the request down for.
 */
export async function decrypt(token: string | undefined) {
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, getEncodedKey(), {
      algorithms: ['HS256'],
    })

    if (typeof payload.userId !== 'string') return null

    return { userId: payload.userId }
  } catch {
    return null
  }
}
