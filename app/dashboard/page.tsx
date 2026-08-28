import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { ChannelChart } from '@/components/dashboard/channel-chart'
import { CustomersTable } from '@/components/dashboard/customers-table'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { StatStrip } from '@/components/dashboard/stat-strip'
import {
  getActivity,
  getChannels,
  getCustomers,
  getMetrics,
  getRevenueSeries,
} from '@/lib/dashboard-data'

export default async function DashboardPage() {
  // Fetched together rather than in series: none of these depend on another,
  // so awaiting them one at a time would just stack their latencies.
  const [metrics, revenue, channels, customers, activity] = await Promise.all([
    getMetrics(),
    getRevenueSeries(),
    getChannels(),
    getCustomers(),
    getActivity(),
  ])

  return (
    <>
      <DashboardHeader crumbs={[{ label: 'Dashboard' }]} />

      <main className="flex flex-1 flex-col gap-4 p-3 md:gap-5 md:p-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Overview</h1>
            <p className="text-muted-foreground text-sm">
              February 2026 · updated 4 minutes ago
            </p>
          </div>
        </div>

        <StatStrip metrics={metrics} />

        {/* The revenue series is the reason someone opens this page, so it gets
            the wider column; the channel ranking reads fine at one third. */}
        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
          {/* min-w-0 on both cells: without it a grid item's automatic minimum
              lets the chart SVG set the column width and push the page wider
              than the viewport. */}
          <div className="min-w-0 lg:col-span-2">
            <RevenueChart data={revenue} />
          </div>
          <div className="min-w-0">
            <ChannelChart data={channels} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
          <div className="min-w-0 lg:col-span-2">
            <CustomersTable customers={customers} />
          </div>
          <div className="min-w-0">
            <ActivityFeed items={activity} />
          </div>
        </div>
      </main>
    </>
  )
}
