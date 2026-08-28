import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/auth/login-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getSession } from '@/lib/auth/dal'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Sightline workspace.',
}

export default async function LoginPage(props: PageProps<'/login'>) {
  // Someone arriving here with a live session almost always means a stale tab
  // or a bookmark, not an intent to switch accounts.
  const session = await getSession()
  if (session?.userId) {
    redirect('/dashboard')
  }

  const searchParams = await props.searchParams
  const from =
    typeof searchParams.from === 'string' ? searchParams.from : undefined

  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Sign in</CardTitle>
          <CardDescription>
            {from
              ? 'Sign in to reach that page.'
              : 'Enter your credentials to reach your dashboard.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm from={from} />
        </CardContent>
      </Card>
    </div>
  )
}
