import type { Metadata } from 'next'

import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { getActivity } from '@/lib/dashboard/data'

export const metadata: Metadata = { title: 'Activity' }

export default async function ActivityPage() {
  const activity = await getActivity()

  return (
    <>
      <DashboardHeader
        crumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Activity' },
        ]}
      />
      <main className="flex flex-1 flex-col gap-4 p-3 md:gap-5 md:p-5">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Activity</h1>
          <p className="text-muted-foreground text-sm">
            Account, billing and security events across the workspace.
          </p>
        </div>
        <div className="max-w-2xl">
          <ActivityFeed items={activity} />
        </div>
      </main>
    </>
  )
}
