'use client'

import * as React from 'react'
import { RotateCwIcon, TriangleAlertIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    // Replace with your reporter (Sentry, OTel) — the digest is what ties this
    // back to the server-side stack trace.
    console.error('Dashboard failed to render:', error)
  }, [error])

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="flex max-w-md flex-col items-center gap-3 text-center">
        <div className="bg-destructive/10 text-destructive flex size-10 items-center justify-center rounded-full">
          <TriangleAlertIcon aria-hidden="true" className="size-5" />
        </div>
        <div className="space-y-1">
          {/* Names the problem and the recovery, not "something went wrong". */}
          <h1 className="text-lg font-semibold">
            This dashboard could not load
          </h1>
          <p className="text-muted-foreground text-sm">
            The metrics request failed before anything could be rendered. Your
            data is unaffected — retrying usually resolves it.
          </p>
          {error.digest && (
            <p className="text-muted-foreground pt-1 font-mono text-xs">
              Reference: {error.digest}
            </p>
          )}
        </div>
        <Button onClick={reset} className="mt-1">
          <RotateCwIcon className="size-3.5" />
          Try again
        </Button>
      </div>
    </div>
  )
}
