import Link from 'next/link'

import { SiteLogo } from '@/components/site/site-logo'

const GROUPS = [
  {
    heading: 'Product',
    links: [
      { label: 'Overview', href: '/#product' },
      { label: 'Pricing', href: '/#pricing' },
      { label: 'Changelog', href: '/#changelog' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Careers', href: '/#careers' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '/#privacy' },
      { label: 'Terms', href: '/#terms' },
    ],
  },
] as const

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-2">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <SiteLogo />
            Sightline
          </Link>
          <p className="text-muted-foreground max-w-xs text-sm">
            Revenue and retention analytics for subscription businesses.
          </p>
        </div>

        {GROUPS.map((group) => (
          <nav key={group.heading} aria-labelledby={`footer-${group.heading}`}>
            <h2
              id={`footer-${group.heading}`}
              className="mb-2 text-sm font-medium"
            >
              {group.heading}
            </h2>
            <ul className="space-y-1.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 border-t px-4 py-5 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Sightline. All rights reserved.
        </p>
        <p className="text-muted-foreground">Built with Next.js</p>
      </div>
    </footer>
  )
}
