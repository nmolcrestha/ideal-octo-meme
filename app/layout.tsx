import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from '@/components/shared/theme-provider'
import '@/styles/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

/**
 * The root layout owns only what both entities share: the document, the fonts,
 * the single stylesheet and the theme. Chrome belongs to the entity — the site
 * header and footer live in app/(site)/layout.tsx, the sidebar and app header
 * in app/dashboard/layout.tsx — so neither can leak into the other.
 */
export const metadata: Metadata = {
  title: {
    template: '%s · Sightline',
    default: 'Sightline',
  },
  description: 'Revenue, retention and account activity for your workspace.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // suppressHydrationWarning is required on <html> because next-themes sets
    // the class and color-scheme on this element before React hydrates.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
