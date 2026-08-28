import 'server-only'

import { verifySession } from '@/lib/auth/dal'
import type {
  ActivityItem,
  ChannelPoint,
  Customer,
  Metric,
  RevenuePoint,
} from '@/lib/dashboard/types'

/**
 * Dashboard data access.
 *
 * Every function here calls `verifySession()` first. The check lives beside
 * the data rather than in the pages on purpose: app/dashboard/layout.tsx does
 * not re-render on a client-side navigation between dashboard routes, so a
 * layout-only guard would stop being enforced the moment someone moved from
 * /dashboard to /dashboard/customers. Putting it here means no future page can
 * read this data without being authenticated, whether or not its author
 * remembered to ask.
 *
 * These are async by design: every function has the shape it would have if it
 * were querying Postgres, so swapping the fixture for a real query is a
 * one-line change per function once you have models in prisma/schema.prisma.
 *
 *   export async function getCustomers() {
 *     return prisma.customer.findMany({ orderBy: { createdAt: 'desc' }, take: 8 })
 *   }
 *
 * Until then the fixtures below keep the UI honest: real-looking magnitudes,
 * a deliberate mix of statuses, and one long name so layout is tested against
 * content that does not cooperate.
 */

export async function getMetrics(): Promise<Metric[]> {
  await verifySession()

  return [
    {
      id: 'mrr',
      label: 'Monthly recurring revenue',
      value: '$48,290',
      delta: 12.4,
      trend: 'up',
      comparison: 'vs. last month',
      hint: 'Sum of active subscription value, normalized to a monthly amount.',
    },
    {
      id: 'active',
      label: 'Active users',
      value: '3,842',
      delta: 6.1,
      trend: 'up',
      comparison: 'vs. last month',
      hint: 'Accounts with at least one session in the trailing 30 days.',
    },
    {
      id: 'churn',
      label: 'Net churn',
      value: '2.1%',
      delta: 0.4,
      trend: 'up',
      inverse: true,
      comparison: 'vs. last month',
      hint: 'Revenue lost to cancellations and downgrades, net of expansion.',
    },
    {
      id: 'conversion',
      label: 'Trial conversion',
      value: '24.8%',
      delta: 3.2,
      trend: 'down',
      comparison: 'vs. last quarter',
      hint: 'Trials that became paid subscriptions within 30 days.',
    },
  ]
}

export async function getRevenueSeries(): Promise<RevenuePoint[]> {
  await verifySession()

  return [
    { month: 'Mar', recurring: 29400, expansion: 3100 },
    { month: 'Apr', recurring: 31200, expansion: 3600 },
    { month: 'May', recurring: 33800, expansion: 4200 },
    { month: 'Jun', recurring: 35100, expansion: 3900 },
    { month: 'Jul', recurring: 38600, expansion: 5100 },
    { month: 'Aug', recurring: 40200, expansion: 5600 },
    { month: 'Sep', recurring: 41900, expansion: 6300 },
    { month: 'Oct', recurring: 43500, expansion: 5900 },
    { month: 'Nov', recurring: 45100, expansion: 6800 },
    { month: 'Dec', recurring: 46800, expansion: 7400 },
    { month: 'Jan', recurring: 47200, expansion: 6900 },
    { month: 'Feb', recurring: 48290, expansion: 7600 },
  ]
}

export async function getChannels(): Promise<ChannelPoint[]> {
  await verifySession()

  return [
    { channel: 'Organic search', signups: 1284 },
    { channel: 'Direct', signups: 962 },
    { channel: 'Referral', signups: 618 },
    { channel: 'Paid social', signups: 431 },
    { channel: 'Partner', signups: 207 },
  ]
}

export async function getCustomers(): Promise<Customer[]> {
  await verifySession()

  return [
    {
      id: 'cus_8fj2',
      name: 'Northwind Logistics International',
      email: 'ops@northwind-logistics.com',
      plan: 'Enterprise',
      status: 'active',
      mrr: 4800,
      seats: 120,
      joined: '2024-03-11',
    },
    {
      id: 'cus_2kd9',
      name: 'Bright Harbor Studio',
      email: 'hello@brightharbor.io',
      plan: 'Growth',
      status: 'active',
      mrr: 890,
      seats: 24,
      joined: '2024-07-02',
    },
    {
      id: 'cus_5tt1',
      name: 'Vellum & Co.',
      email: 'accounts@vellum.co',
      plan: 'Scale',
      status: 'past_due',
      mrr: 1650,
      seats: 41,
      joined: '2023-11-19',
    },
    {
      id: 'cus_9wq4',
      name: 'Atlas Field Services',
      email: 'billing@atlasfield.com',
      plan: 'Growth',
      status: 'trialing',
      mrr: 0,
      seats: 8,
      joined: '2025-02-08',
    },
    {
      id: 'cus_1pz7',
      name: 'Kestrel Analytics',
      email: 'team@kestrel.dev',
      plan: 'Starter',
      status: 'active',
      mrr: 240,
      seats: 6,
      joined: '2024-09-30',
    },
    {
      id: 'cus_6bn3',
      name: 'Meridian Health Group',
      email: 'it@meridianhealth.org',
      plan: 'Enterprise',
      status: 'active',
      mrr: 6200,
      seats: 210,
      joined: '2023-05-22',
    },
    {
      id: 'cus_4hs8',
      name: 'Cobalt Interactive',
      email: 'dev@cobalt.gg',
      plan: 'Scale',
      status: 'churned',
      mrr: 0,
      seats: 0,
      joined: '2023-08-14',
    },
    {
      id: 'cus_7rv5',
      name: 'Willow Creek Bakery',
      email: 'owner@willowcreek.bakery',
      plan: 'Starter',
      status: 'active',
      mrr: 120,
      seats: 3,
      joined: '2025-01-16',
    },
  ]
}

export async function getActivity(): Promise<ActivityItem[]> {
  await verifySession()

  return [
    {
      id: 'act_1',
      actor: 'Meridian Health Group',
      action: 'upgraded to',
      target: 'Enterprise',
      at: '12 minutes ago',
      kind: 'billing',
    },
    {
      id: 'act_2',
      actor: 'Vellum & Co.',
      action: 'payment failed on',
      target: 'invoice #4471',
      at: '1 hour ago',
      kind: 'billing',
    },
    {
      id: 'act_3',
      actor: 'Atlas Field Services',
      action: 'started a trial on',
      target: 'Growth',
      at: '3 hours ago',
      kind: 'account',
    },
    {
      id: 'act_4',
      actor: 'Kestrel Analytics',
      action: 'enabled',
      target: 'two-factor auth',
      at: '5 hours ago',
      kind: 'security',
    },
    {
      id: 'act_5',
      actor: 'Northwind Logistics',
      action: 'passed 80% of',
      target: 'API quota',
      at: 'Yesterday',
      kind: 'usage',
    },
    {
      id: 'act_6',
      actor: 'Cobalt Interactive',
      action: 'cancelled',
      target: 'Scale',
      at: '2 days ago',
      kind: 'account',
    },
  ]
}
