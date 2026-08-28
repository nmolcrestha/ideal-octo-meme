'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

import type { ChannelPoint } from '@/lib/dashboard/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

/**
 * One hue, not five. These bars encode magnitude and their identity is already
 * carried by the axis labels, so a categorical palette would be five colors
 * doing no work — and the token set has no five mutually distinguishable steps
 * on a light surface anyway. Ranked descending so the comparison is immediate.
 */
const chartConfig = {
  signups: { label: 'Signups', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function ChannelChart({ data }: { data: ChannelPoint[] }) {
  const ranked = [...data].sort((a, b) => b.signups - a.signups)
  const total = ranked.reduce((sum, row) => sum + row.signups, 0)

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>Signups by channel</CardTitle>
        <CardDescription>
          {total.toLocaleString('en-US')} signups in the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-64 w-full"
        >
          <BarChart
            data={ranked}
            layout="vertical"
            margin={{ left: 0, right: 36 }}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" dataKey="signups" hide />
            <YAxis
              type="category"
              dataKey="channel"
              tickLine={false}
              axisLine={false}
              width={116}
              tickMargin={6}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideIndicator />}
            />
            {/* 4px rounded data-end, square against the baseline. barSize with
                the category gap leaves the 2px surface gap between marks. */}
            <Bar
              dataKey="signups"
              fill="var(--color-signups)"
              radius={[0, 4, 4, 0]}
              barSize={22}
              isAnimationActive={false}
            >
              {/* Direct labels: five marks is few enough that the value can sit
                  on each bar, which removes the need for an x axis entirely. */}
              <LabelList
                dataKey="signups"
                position="right"
                offset={8}
                className="fill-muted-foreground tabular"
                fontSize={11}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
