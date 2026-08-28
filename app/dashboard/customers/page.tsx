import type { Metadata } from 'next'

import { CustomersTable } from '@/components/dashboard/customers-table'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { getCustomers } from '@/lib/dashboard-data'

export const metadata: Metadata = { title: 'Customers' }

export default async function CustomersPage() {
  const customers = await getCustomers()

  return (
    <>
      <DashboardHeader
        crumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Customers' },
        ]}
      />
      <main className="flex flex-1 flex-col gap-4 p-3 md:gap-5 md:p-5">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Customers</h1>
          <p className="text-muted-foreground text-sm">
            Every account with a subscription or an active trial.
          </p>
        </div>
        <CustomersTable
          customers={customers}
          caption="Sorted by most recent activity."
        />
      </main>
    </>
  )
}
