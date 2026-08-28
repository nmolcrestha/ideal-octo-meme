import Link from 'next/link'

import { ThemeToggle } from '@/components/shared/theme-toggle'
import { SiteLogo } from '@/components/site/site-logo'

/**
 * Chrome for the credential screens. A route group, so /login stays at the
 * root of the URL while getting neither the marketing header and footer nor
 * the dashboard sidebar — a sign-in page with a "Open dashboard" button in the
 * corner invites exactly the click that bounced the visitor here.
 */
export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="flex min-h-svh flex-col">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-medium tracking-tight"
        >
          <SiteLogo />
          Sightline
        </Link>
        <ThemeToggle />
      </div>

      <main className="flex flex-1 items-center justify-center px-4 pb-16 sm:px-6">
        {children}
      </main>
    </div>
  )
}
