/**
 * Database seed.
 *
 * Creates the account you sign in with. Run it with:
 *
 *   npm run db:seed
 *
 * Idempotent: re-running it resets the seeded user's password back to the
 * configured value rather than failing on the unique email, so a forgotten
 * dev password is one command away from being recovered.
 *
 * Executed by tsx (see the `db:seed` script), which is why it can use the `@/`
 * alias and import the app's own Prisma client and hashing helper — the seed
 * and the login path must never disagree about the algorithm or the cost.
 */
import 'dotenv/config'

import { normalizeEmail, PasswordSchema } from '@/lib/auth/definitions'
import { hashPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/prisma'

/**
 * Override these in `.env` to seed different credentials. The defaults are
 * development credentials and are safe to commit precisely because they are
 * worthless against anything but a local database.
 */
const SEED_EMAIL = process.env.SEED_USER_EMAIL ?? 'anmol@mandarix.com'
const SEED_PASSWORD = process.env.SEED_USER_PASSWORD ?? 'sightline123'
const SEED_NAME = process.env.SEED_USER_NAME ?? 'Anmol Shrestha'

async function main() {
  // A weak override would otherwise only surface later as a login that works
  // but could never be set through a real signup form.
  const password = PasswordSchema.safeParse(SEED_PASSWORD)
  if (!password.success) {
    throw new Error(
      `SEED_USER_PASSWORD is not acceptable: ${password.error.issues
        .map((issue) => issue.message)
        .join(' ')}`,
    )
  }

  const email = normalizeEmail(SEED_EMAIL)
  const passwordHash = await hashPassword(password.data)

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name: SEED_NAME },
    create: { email, passwordHash, name: SEED_NAME },
    select: { id: true, email: true, name: true },
  })

  console.log(`Seeded user ${user.name} <${user.email}>`)
  console.log(`  email:    ${user.email}`)
  console.log(`  password: ${SEED_PASSWORD}`)
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
