import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  CircleSlashIcon,
  ClockIcon,
} from 'lucide-react'

import { STATUS_LABELS, type CustomerStatus } from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

/**
 * Status ships as icon + label, never color alone: the same badge has to work
 * for a colorblind reader, in forced-colors mode, and printed in grayscale.
 */
const STYLES: Record<
  CustomerStatus,
  { className: string; icon: typeof ClockIcon }
> = {
  active: {
    className: 'text-success-ink border-success/30 bg-success/10',
    icon: CheckCircle2Icon,
  },
  trialing: {
    // No fill. On bg-muted the muted foreground only reached 4.35:1, and a
    // trial is also the state that should sit quietest of the four.
    className: 'text-muted-foreground border-border bg-transparent',
    icon: ClockIcon,
  },
  past_due: {
    className: 'text-warning-ink border-warning/30 bg-warning/10',
    icon: AlertTriangleIcon,
  },
  churned: {
    className: 'text-destructive-ink border-destructive/30 bg-destructive/10',
    icon: CircleSlashIcon,
  },
}

export function StatusBadge({ status }: { status: CustomerStatus }) {
  const { className, icon: Icon } = STYLES[status]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-3" />
      {STATUS_LABELS[status]}
    </span>
  )
}
