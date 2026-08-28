'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ActivityIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

const NAV = [
  {
    label: 'Overview',
    items: [
      { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboardIcon },
      {
        title: 'Customers',
        href: '/dashboard/customers',
        icon: UsersIcon,
        badge: '8',
      },
      { title: 'Activity', href: '/dashboard/activity', icon: ActivityIcon },
    ],
  },
  {
    label: 'Account',
    items: [
      { title: 'Billing', href: '/dashboard/billing', icon: CreditCardIcon },
      { title: 'Settings', href: '/dashboard/settings', icon: SettingsIcon },
    ],
  },
] as const

export function AppSidebar() {
  const pathname = usePathname()

  // Exact match for the index so it does not stay lit on every child route;
  // prefix match elsewhere so detail pages keep their section highlighted.
  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === href : pathname.startsWith(href)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                  {/* Authored mark rather than an emoji or a stray glyph. */}
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M4 17.5 9.5 11l4 4L20 6.5" />
                  </svg>
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-medium">Sightline</span>
                  <span className="text-muted-foreground truncate text-xs">
                    Acme Inc.
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {NAV.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={item.title}
                      >
                        <Link
                          href={item.href}
                          aria-current={active ? 'page' : undefined}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {'badge' in item && item.badge ? (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild size="sm" tooltip="Support">
                  <Link href="/dashboard/support">
                    <LifeBuoyIcon />
                    <span>Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent"
                >
                  <Avatar className="size-8 rounded-md">
                    <AvatarFallback className="rounded-md text-xs">
                      AS
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-medium">Anmol Shrestha</span>
                    <span className="text-muted-foreground truncate text-xs">
                      anmol@mandarix.com
                    </span>
                  </div>
                  <ChevronsUpDownIcon className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                align="end"
                sideOffset={8}
                className="w-56"
              >
                <DropdownMenuLabel className="text-muted-foreground text-xs font-normal">
                  Signed in as anmol@mandarix.com
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="size-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon className="size-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOutIcon className="size-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
