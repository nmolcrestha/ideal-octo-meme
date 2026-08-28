import * as z from 'zod'

/**
 * Shared auth contracts. Kept free of `server-only` and of any Node import so
 * the login form (a client component) can reuse the same shapes the Server
 * Action validates against.
 */

/** Emails are stored lowercased and trimmed; normalize on every read and write. */
export function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

/**
 * Login is deliberately laxer than signup would be: an existing password only
 * has to be present, not strong. Rejecting a short password here would leak
 * the fact that no account could have that password anyway, and it turns a
 * "wrong credentials" answer into two distinguishable failures.
 */
export const LoginFormSchema = z.object({
  email: z.email({ error: 'Enter a valid email address.' }).trim(),
  password: z.string().min(1, { error: 'Enter your password.' }),
})

/** The strength rules a real signup/reset flow would enforce. */
export const PasswordSchema = z
  .string()
  .min(8, { error: 'Use at least 8 characters.' })
  .regex(/[a-zA-Z]/, { error: 'Include at least one letter.' })
  .regex(/[0-9]/, { error: 'Include at least one number.' })

export type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      /** Form-level failure (bad credentials, database unreachable). */
      message?: string
      /** Echoed back so a failed submit does not clear the field. */
      email?: string
    }
  | undefined

/** What the session cookie carries. Nothing sensitive, nothing personal. */
export type SessionPayload = {
  userId: string
  expiresAt: Date
}

/**
 * The subset of a User that is safe to hand to the client — a DTO, so
 * `passwordHash` cannot reach a component by accident.
 */
export type SessionUser = {
  id: string
  name: string
  email: string
}
