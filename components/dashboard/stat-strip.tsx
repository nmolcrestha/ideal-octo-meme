import { ArrowDownRightIcon, ArrowUpRightIcon, InfoIcon } from 'lucide-react'

import type { Metric } from '@/lib/dashboard/data'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

/**
 * The KPI row. One bordered strip split into cells rather than four separate
 * cards: the metrics are one comparable set, and it keeps the page from
 * opening on a row of identical boxes.
 */
export function StatStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <section aria-labelledby="kpi-heading">
      <h2 id="kpi-heading" className="sr-only">
        Key metrics
      </h2>
      <dl className="bg-card grid grid-cols-1 gap-px overflow-hidden rounded-lg border sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <StatCell key={metric.id} metric={metric} />
        ))}
      </dl>
    </section>
  )
}

function StatCell({ metric }: { metric: Metric }) {
  // An increase is not automatically good. Churn and refunds invert, so the
  // color follows the meaning of the movement, not its direction.
  const rising = metric.trend === 'up'
  const good = metric.inverse ? !rising : rising
  const Arrow = rising ? ArrowUpRightIcon : ArrowDownRightIcon

  return (
    <div className="bg-card outline-border relative flex flex-col gap-1.5 p-4 outline outline-offset-0 md:p-5">
      <dt className="text-muted-foreground flex items-center gap-1.5 text-sm">
        <span className="truncate">{metric.label}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="text-muted-foreground/60 hover:text-foreground shrink-0 rounded-sm transition-colors"
              aria-label={`How ${metric.label.toLowerCase()} is calculated`}
            >
              <InfoIcon className="size-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-60">
            {metric.hint}
          </TooltipContent>
        </Tooltip>
      </dt>

      <dd className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="tabular text-2xl font-semibold tracking-tight md:text-[1.75rem]">
          {metric.value}
        </span>
        <span
          className={cn(
            'tabular inline-flex items-center gap-0.5 text-xs font-medium',
            good ? 'text-success-ink' : 'text-destructive-ink',
          )}
        >
          <Arrow aria-hidden="true" className="size-3.5" />
          {metric.delta}%
          {/* The direction is stated in text too, so the meaning never rests
              on color or on the arrow glyph alone. */}
          <span className="sr-only">
            {rising ? 'increase' : 'decrease'},{' '}
            {good ? 'favorable' : 'unfavorable'}
          </span>
        </span>
        {/* Always its own line. Letting this wrap only when it happened not to
            fit made the four cells disagree with each other. */}
        <span className="text-muted-foreground w-full text-xs">
          {metric.comparison}
        </span>
      </dd>
    </div>
  )
}
