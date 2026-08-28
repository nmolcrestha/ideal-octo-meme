import type { Metadata } from 'next'

import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { requireUser } from '@/lib/auth/dal'

// The "%s · Sightline" template is set once in the root layout; this only
// needs the default for /dashboard itself, which child pages then override.
export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardLayout({
  children,
}: LayoutProps<'/dashboard'>) {
  // The guard for the whole segment. proxy.ts already turned anonymous traffic
  // away, but that check reads a cookie and nothing more — this one resolves
  // the session against the database, so a token signed for an account that no
  // longer exists cannot render a dashboard.
  const user = await requireUser()

  return (
    // SidebarProvider does not include a TooltipProvider in this version, and
    // the collapsed-rail tooltips on every nav item need one above them.
    <TooltipProvider delayDuration={300}>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset className="min-w-0">{children}</SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
