import {
  CreditCardIcon,
  GaugeIcon,
  ShieldCheckIcon,
  UserRoundIcon,
} from 'lucide-react'

import type { ActivityItem } from '@/lib/dashboard-data'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const KIND_ICON = {
  billing: CreditCardIcon,
  account: UserRoundIcon,
  security: ShieldCheckIcon,
  usage: GaugeIcon,
} as const

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Account and billing events</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-4">
          {items.map((item, index) => {
            const Icon = KIND_ICON[item.kind]
            const last = index === items.length - 1
            return (
              <li key={item.id} className="relative flex gap-3">
                {/* A single connector drawn per item rather than one absolute
                    rail, so it never overshoots the final entry. */}
                {!last && (
                  <span
                    aria-hidden="true"
                    className="bg-border absolute top-7 left-[13px] h-[calc(100%+0.25rem)] w-px"
                  />
                )}
                <span className="bg-muted text-muted-foreground relative flex size-7 shrink-0 items-center justify-center rounded-full">
                  <Icon aria-hidden="true" className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1 pt-0.5 text-sm">
                  <p className="leading-snug">
                    <span className="font-medium">{item.actor}</span>{' '}
                    <span className="text-muted-foreground">{item.action}</span>{' '}
                    <span className="font-medium">{item.target}</span>
                  </p>
                  <time className="text-muted-foreground text-xs">
                    {item.at}
                  </time>
                </div>
              </li>
            )
          })}
        </ol>
      </CardContent>
    </Card>
  )
}
