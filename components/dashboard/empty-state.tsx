import { InboxIcon, PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

/**
 * An empty state teaches the interface rather than reporting a void: what
 * belongs here, why it is empty, and the one action that fills it.
 */
export function EmptyState({
  title,
  description,
  actionLabel,
  icon: Icon = InboxIcon,
}: {
  title: string
  description: string
  actionLabel?: string
  icon?: typeof InboxIcon
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-12 text-center">
      <div className="bg-muted text-muted-foreground flex size-10 items-center justify-center rounded-full">
        <Icon aria-hidden="true" className="size-5" />
      </div>
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        <p className="text-muted-foreground mx-auto max-w-sm text-sm">
          {description}
        </p>
      </div>
      {actionLabel && (
        <Button size="sm" className="mt-1">
          <PlusIcon className="size-3.5" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
