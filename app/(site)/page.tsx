import Link from 'next/link'
import { ArrowRightIcon, CheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

/**
 * Site home. Deliberately lean — a scaffold with the real structure (hero,
 * capability band, closing action) and honest copy, ready to be filled in
 * rather than a finished marketing page.
 */
const CAPABILITIES = [
  {
    title: 'Revenue you can reconcile',
    body: 'Recurring and expansion reported separately, so the number on the dashboard matches the number in your ledger.',
  },
  {
    title: 'Retention in context',
    body: 'Net churn beside the cohort it came from, with the comparison window stated on every metric.',
  },
  {
    title: 'One source of truth',
    body: 'Metric windows bucket in a timezone you set once. Exports use the same boundaries as the charts.',
  },
]

export default function HomePage() {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-14 sm:px-6 md:pt-24 md:pb-20">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          Know what your revenue is actually doing
        </h1>
        <p className="text-muted-foreground max-w-site-measure mt-4 text-lg">
          Sightline reads your subscription data and answers the two questions
          that matter every month: what came in, and what is about to leave.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Open the dashboard
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            Book a walkthrough
          </Button>
        </div>
        <p className="text-muted-foreground mt-4 text-sm">
          No card required. Connect Postgres or Stripe in a few minutes.
        </p>
      </section>

      <section
        id="product"
        aria-labelledby="product-heading"
        className="bg-site-band border-y"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <h2
            id="product-heading"
            className="text-2xl font-semibold tracking-tight md:text-3xl"
          >
            Built to be trusted, not just looked at
          </h2>
          <dl className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
            {CAPABILITIES.map((item) => (
              <div key={item.title}>
                <dt className="flex items-center gap-2 font-medium">
                  <CheckIcon
                    aria-hidden="true"
                    className="text-success-ink size-4 shrink-0"
                  />
                  {item.title}
                </dt>
                <dd className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              See it with your own numbers
            </h2>
            <p className="text-muted-foreground mt-1.5">
              The dashboard is live with sample data. Point it at your database
              when you are ready.
            </p>
          </div>
          <Button size="lg" asChild className="shrink-0">
            <Link href="/dashboard">
              Open the dashboard
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
