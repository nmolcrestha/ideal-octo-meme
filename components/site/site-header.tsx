'use client'

import * as React from 'react'
import Link from 'next/link'
import { MenuIcon, XIcon } from 'lucide-react'

import { ThemeToggle } from '@/components/shared/theme-toggle'
import { Button } from '@/components/ui/button'
import { SiteLogo } from '@/components/site/site-logo'

const LINKS = [
  { label: 'Product', href: '/#product' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Docs', href: '/#docs' },
] as const

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="bg-background/80 sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="h-site-nav mx-auto flex w-full max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-medium tracking-tight"
        >
          <SiteLogo />
          Sightline
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-md px-2.5 py-1.5 text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard">Open dashboard</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="site-nav-mobile"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <XIcon className="size-4" />
            ) : (
              <MenuIcon className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Disclosure rather than a modal: the nav is three links, and nothing
          here needs protected focus. */}
      {open && (
        <nav
          id="site-nav-mobile"
          aria-label="Main"
          className="border-t md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground block rounded-md px-2 py-2 text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Sign in is hidden from the bar below sm, so it has to appear
                here — otherwise there is no way to sign in on a phone. */}
            <li className="mt-1 border-t pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
