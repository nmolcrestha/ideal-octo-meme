import type { Metadata } from 'next'

import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

export const metadata: Metadata = {
  title: {
    template: '%s · Sightline',
    default: 'Dashboard · Sightline',
  },
  description: 'Revenue, retention and account activity for your workspace.',
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
