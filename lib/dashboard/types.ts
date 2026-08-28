/**
 * Dashboard view contracts and formatting.
 *
 * Deliberately free of any server dependency: the charts, tables and badges in
 * components/dashboard are Client Components and import from here, so anything
 * added to this file ends up in the browser bundle. The fetchers that read the
 * session and hit the database live next door in data.ts — keeping them apart
 * is what stops Prisma and pg from being pulled into the client.
 */

export type Trend = 'up' | 'down'

export type Metric = {
  id: string
  label: string
  /** Pre-formatted for display; keep raw values out of the view layer. */
  value: string
  /** Percentage change against the comparison window. */
  delta: number
  trend: Trend
  /** What the delta is measured against, shown beside it. */
  comparison: string
  /** True when an increase is bad (churn, refunds). Drives the delta color. */
  inverse?: boolean
  hint: string
}

export type RevenuePoint = {
  month: string
  recurring: number
  expansion: number
}

export type ChannelPoint = {
  channel: string
  signups: number
}

export type CustomerStatus = 'active' | 'trialing' | 'past_due' | 'churned'

export type Customer = {
  id: string
  name: string
  email: string
  plan: 'Starter' | 'Growth' | 'Scale' | 'Enterprise'
  status: CustomerStatus
  mrr: number
  seats: number
  joined: string
}

export type ActivityItem = {
  id: string
  actor: string
  action: string
  target: string
  at: string
  kind: 'billing' | 'account' | 'security' | 'usage'
}

/** Currency for table cells and axis ticks. No cents: dashboards read faster. */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatCompactCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export const STATUS_LABELS: Record<CustomerStatus, string> = {
  active: 'Active',
  trialing: 'Trialing',
  past_due: 'Past due',
  churned: 'Churned',
}
