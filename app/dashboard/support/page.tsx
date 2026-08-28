import type { Metadata } from 'next'
import { LifeBuoyIcon } from 'lucide-react'

import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { EmptyState } from '@/components/dashboard/empty-state'

export const metadata: Metadata = { title: 'Support' }

export default function SupportPage() {
  return (
    <>
      <DashboardHeader
        crumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Support' },
        ]}
      />
      <main className="flex flex-1 flex-col gap-4 p-3 md:gap-5 md:p-5">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Support</h1>
          <p className="text-muted-foreground text-sm">
            Open a conversation with the team.
          </p>
        </div>
        <EmptyState
          icon={LifeBuoyIcon}
          title="No open tickets"
          description="When you start a conversation it stays here with its full history, so you can pick it back up without repeating yourself."
          actionLabel="New ticket"
        />
      </main>
    </>
  )
}
