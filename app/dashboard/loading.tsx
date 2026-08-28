import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Skeletons in the shape of the real layout, not a spinner in the middle of
 * the page: the frame stays put and only the values arrive.
 */
export default function DashboardLoading() {
  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-3 border-b px-3 md:px-4">
        <Skeleton className="size-7 rounded-md" />
        <Skeleton className="h-4 w-24" />
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="hidden h-8 w-52 md:block lg:w-64" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-3 md:gap-5 md:p-5">
        <div className="space-y-2">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-4 w-56" />
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="outline-border space-y-2.5 p-4 outline md:p-5"
            >
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-3 w-28" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full md:h-72" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-44" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Skeleton className="size-7 shrink-0 rounded-md" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-2/5" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-3.5 w-14" />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex gap-3">
                  <Skeleton className="size-7 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-4/5" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
