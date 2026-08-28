import type { Metadata } from 'next'
import { CreditCardIcon } from 'lucide-react'

import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { EmptyState } from '@/components/dashboard/empty-state'
import { verifySession } from '@/lib/auth/dal'

export const metadata: Metadata = { title: 'Billing' }

export default async function BillingPage() {
  // This page renders no data of its own, so there is nothing in
  // lib/dashboard/data.ts to carry the guard for it. Layouts do not
  // re-render on client-side navigation, so the check has to be here.
  await verifySession()

  return (
    <>
      <DashboardHeader
        crumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Billing' },
        ]}
      />
      <main className="flex flex-1 flex-col gap-4 p-3 md:gap-5 md:p-5">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Billing</h1>
          <p className="text-muted-foreground text-sm">
            Invoices, payment method and plan.
          </p>
        </div>
        <EmptyState
          icon={CreditCardIcon}
          title="No invoices yet"
          description="Your first invoice will appear here at the end of the current billing period. Add a payment method now to avoid an interruption."
          actionLabel="Add payment method"
        />
      </main>
    </>
  )
}
