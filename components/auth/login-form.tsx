'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { LoaderCircleIcon } from 'lucide-react'

import { login } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/**
 * Submit lives in its own component because `useFormStatus` reads the state of
 * the nearest parent <form>, which means it cannot be called by the component
 * that renders that form.
 */
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <LoaderCircleIcon className="size-4 animate-spin" />}
      {pending ? 'Signing in…' : 'Sign in'}
    </Button>
  )
}

export function LoginForm({ from }: { from?: string }) {
  const [state, formAction] = useActionState(login, undefined)

  const emailErrors = state?.errors?.email
  const passwordErrors = state?.errors?.password

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {/* Where to land after a successful sign-in. The Server Action accepts
          it only if it is a dashboard path, so it cannot become an open
          redirect. */}
      {from && <input type="hidden" name="from" value={from} />}

      {/* The credential failure is a form-level error, not a field one: saying
          which half was wrong is what lets someone enumerate accounts. */}
      {state?.message && (
        <p
          role="alert"
          className="border-destructive/30 bg-destructive/8 text-destructive rounded-md border px-3 py-2 text-sm"
        >
          {state.message}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          // Retained across a failed submit; browsers clear inputs when the
          // server sends new markup for the form.
          defaultValue={state?.email}
          required
          autoFocus
          aria-invalid={emailErrors ? true : undefined}
          aria-describedby={emailErrors ? 'email-error' : undefined}
        />
        {emailErrors && (
          <p id="email-error" className="text-destructive text-xs">
            {emailErrors.join(' ')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={passwordErrors ? true : undefined}
          aria-describedby={passwordErrors ? 'password-error' : undefined}
        />
        {passwordErrors && (
          <p id="password-error" className="text-destructive text-xs">
            {passwordErrors.join(' ')}
          </p>
        )}
      </div>

      <SubmitButton />
    </form>
  )
}
