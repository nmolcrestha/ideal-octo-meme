'use server'

import { redirect } from 'next/navigation'
import * as z from 'zod'

import type { LoginFormState } from '@/lib/auth/definitions'
import { LoginFormSchema, normalizeEmail } from '@/lib/auth/definitions'
import { createSession, deleteSession } from '@/lib/auth/dal'
import { verifyPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/prisma'

/**
 * A bcrypt digest of a value nothing will ever match, used to spend the same
 * time verifying a password for an address that has no account as for one that
 * does. Without it, "no such user" returns measurably faster than "wrong
 * password" and the login form becomes an account-enumeration oracle.
 */
const DUMMY_HASH =
  '$2b$12$C6UzMDM.H6dfI/f/IKcEe.eOHXcXBnRHKKgVzYQTBRkfr8YvGGCPa'

/** One message for every credential failure, so none of them is a hint. */
const INVALID_CREDENTIALS = 'That email and password combination is not valid.'

/**
 * Only same-origin dashboard paths are honoured as a post-login destination.
 * `from` arrives in the URL, so a visitor controls it — echoing it into a
 * redirect unchecked is an open redirect.
 */
function safeRedirectTo(from: unknown) {
  return typeof from === 'string' && /^\/dashboard(\/|$)/.test(from)
    ? from
    : '/dashboard'
}

export async function login(
  _state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const rawEmail = formData.get('email')
  const submittedEmail = typeof rawEmail === 'string' ? rawEmail : ''

  const validatedFields = LoginFormSchema.safeParse({
    email: submittedEmail,
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      email: submittedEmail,
    }
  }

  const { email, password } = validatedFields.data
  const destination = safeRedirectTo(formData.get('from'))

  let userId: string
  try {
    const user = await prisma.user.findUnique({
      where: { email: normalizeEmail(email) },
      select: { id: true, passwordHash: true },
    })

    const matches = await verifyPassword(
      password,
      user?.passwordHash ?? DUMMY_HASH,
    )

    if (!user || !matches) {
      return { message: INVALID_CREDENTIALS, email: submittedEmail }
    }

    userId = user.id
  } catch (error) {
    console.error('Login failed', error)
    return {
      message: 'Something went wrong signing you in. Please try again.',
      email: submittedEmail,
    }
  }

  await createSession(userId)

  // Outside the try/catch on purpose: `redirect` signals by throwing, and a
  // catch block would swallow it and report a login failure instead.
  redirect(destination)
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
