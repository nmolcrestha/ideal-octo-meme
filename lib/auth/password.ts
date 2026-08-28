import { compare, hash } from 'bcryptjs'

/**
 * Password hashing.
 *
 * Deliberately free of the `server-only` marker: `prisma/seed.ts` runs outside
 * a React Server bundle (plain Node, via tsx) and imports this module so the
 * seed and the login path can never disagree about the algorithm or cost.
 */

/**
 * bcrypt work factor. Each +1 doubles the time to verify. 12 is the current
 * sensible floor; raise it as hardware improves — existing hashes stay valid
 * because the cost is encoded in the digest itself.
 */
const COST = 12

export async function hashPassword(plain: string) {
  return hash(plain, COST)
}

export async function verifyPassword(plain: string, digest: string) {
  // bcrypt's own comparison is constant-time for a given digest, so this does
  // not leak the password by timing.
  return compare(plain, digest)
}
