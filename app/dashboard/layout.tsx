import type { Metadata } from 'next'

import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

// The "%s · Sightline" template is set once in the root layout; this only
// needs the default for /dashboard itself, which child pages then override.
export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardLayout({
  children,
}: LayoutProps<'/dashboard'>) {
  return (
    // SidebarProvider does not include a TooltipProvider in this version, and
    // the collapsed-rail tooltips on every nav item need one above them.
    <TooltipProvider delayDuration={300}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="min-w-0">{children}</SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
