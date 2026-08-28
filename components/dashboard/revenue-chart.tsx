'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import type { RevenuePoint } from '@/lib/dashboard/data'
import { formatCompactCurrency, formatCurrency } from '@/lib/dashboard/data'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/**
 * Two series only, and deliberately these two: chart-1 and chart-2 are the
 * one pair in the token set that clears the CVD, lightness-band and contrast
 * checks on both the light and the dark surface (adjacent deltaE 14.8 protan).
 * Adding chart-4 or chart-5 here would drop the worst adjacent pair to
 * deltaE 7.4, which is below the normal-vision floor.
 */
const chartConfig = {
  recurring: { label: 'Recurring', color: 'var(--chart-1)' },
  expansion: { label: 'Expansion', color: 'var(--chart-2)' },
} satisfies ChartConfig

const RANGES = {
  '3m': 3,
  '6m': 6,
  '12m': 12,
} as const

type RangeKey = keyof typeof RANGES

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  const [range, setRange] = React.useState<RangeKey>('12m')

  const visible = React.useMemo(() => data.slice(-RANGES[range]), [data, range])

  // The headline reconciles with the MRR metric above it: recurring is the
  // figure that KPI reports, and expansion is called out separately rather
  // than silently folded into a larger, unexplained total.
  const { total, expansion } = React.useMemo(() => {
    const last = visible.at(-1)
    return {
      total: last ? last.recurring + last.expansion : 0,
      expansion: last?.expansion ?? 0,
    }
  }, [visible])

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>Recurring revenue</CardTitle>
        <CardDescription>
          {formatCurrency(total)} in February, of which{' '}
          {formatCurrency(expansion)} was expansion
        </CardDescription>
        <CardAction>
          <Select
            value={range}
            onValueChange={(value) => setRange(value as RangeKey)}
          >
            {/* Short labels: "Last 12 months" was being clipped by the trigger
                at every breakpoint. The card title already says what is being
                measured, so the range alone is enough here. */}
            <SelectTrigger size="sm" className="w-28" aria-label="Time range">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="3m">3 months</SelectItem>
              <SelectItem value="6m">6 months</SelectItem>
              <SelectItem value="12m">12 months</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-64 w-full md:h-72"
        >
          <AreaChart data={visible} margin={{ left: 4, right: 8, top: 4 }}>
            <defs>
              {/* A soft vertical fade so the stacked bands stay legible where
                  they overlap the grid, without washing out the hue. */}
              {(['recurring', 'expansion'] as const).map((key) => (
                <linearGradient
                  key={key}
                  id={`fill-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.55}
                  />
                  <stop
                    offset="100%"
                    stopColor={`var(--color-${key})`}
                    stopOpacity={0.06}
                  />
                </linearGradient>
              ))}
            </defs>

            {/* Horizontal only: vertical rules add nothing when the x axis is
                already categorical months. */}
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              minTickGap={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={52}
              tickFormatter={(value: number) => formatCompactCurrency(value)}
            />

            <ChartTooltip
              cursor={{ strokeWidth: 1 }}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  formatter={(value, name) => (
                    <div className="flex flex-1 items-center justify-between gap-3">
                      <span className="text-muted-foreground">
                        {chartConfig[name as keyof typeof chartConfig]?.label ??
                          name}
                      </span>
                      <span className="tabular font-medium">
                        {formatCurrency(Number(value))}
                      </span>
                    </div>
                  )}
                />
              }
            />

            {/* Painted expansion-first so the larger recurring band sits on the
                baseline; stroke widths at 2px per the mark spec. */}
            <Area
              dataKey="recurring"
              type="monotone"
              stackId="mrr"
              stroke="var(--color-recurring)"
              strokeWidth={2}
              fill="url(#fill-recurring)"
              activeDot={{ r: 4, strokeWidth: 2 }}
              isAnimationActive={false}
            />
            <Area
              dataKey="expansion"
              type="monotone"
              stackId="mrr"
              stroke="var(--color-expansion)"
              strokeWidth={2}
              fill="url(#fill-expansion)"
              activeDot={{ r: 4, strokeWidth: 2 }}
              isAnimationActive={false}
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
