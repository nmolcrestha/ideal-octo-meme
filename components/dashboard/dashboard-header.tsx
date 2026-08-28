'use client'

import * as React from 'react'
import Link from 'next/link'
import { BellIcon, PlusIcon, SearchIcon } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

type Crumb = { label: string; href?: string }

export function DashboardHeader({
  crumbs,
  unread = 3,
}: {
  crumbs: Crumb[]
  unread?: number
}) {
  const searchRef = React.useRef<HTMLInputElement>(null)

  // Cmd/Ctrl-K focuses search. Standard in this category, so its absence is
  // felt; the shortcut is also printed in the field so it is discoverable.
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className="bg-background/80 sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b px-3 backdrop-blur-sm md:px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-1 data-[orientation=vertical]:h-4"
      />

      <Breadcrumb className="min-w-0">
        <BreadcrumbList>
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1
            return (
              <React.Fragment key={crumb.label}>
                <BreadcrumbItem className={last ? 'min-w-0' : 'hidden sm:flex'}>
                  {last || !crumb.href ? (
                    <BreadcrumbPage className="truncate">
                      {crumb.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!last && <BreadcrumbSeparator className="hidden sm:block" />}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-1.5">
        <div className="relative hidden md:block">
          <SearchIcon
            aria-hidden="true"
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2"
          />
          <Input
            ref={searchRef}
            type="search"
            placeholder="Search customers…"
            aria-label="Search customers"
            className="h-8 w-52 ps-8 pe-12 lg:w-64"
          />
          <kbd className="text-muted-foreground pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 items-center gap-0.5 rounded border px-1 font-mono text-[10px] font-medium lg:inline-flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Search"
          className="text-muted-foreground hover:text-foreground md:hidden"
        >
          <SearchIcon className="size-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={
                unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'
              }
              className="text-muted-foreground hover:text-foreground relative"
            >
              <BellIcon className="size-4" />
              {unread > 0 && (
                <span className="bg-chart-1 ring-background absolute top-1.5 right-1.5 size-1.5 rounded-full ring-2" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <span className="font-medium">Payment failed</span>
              <span className="text-muted-foreground text-xs">
                Vellum &amp; Co. — invoice #4471
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <span className="font-medium">Quota warning</span>
              <span className="text-muted-foreground text-xs">
                Northwind passed 80% of its API quota
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <span className="font-medium">New Enterprise upgrade</span>
              <span className="text-muted-foreground text-xs">
                Meridian Health Group
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm">
              View all
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggle />

        <Separator
          orientation="vertical"
          className="mx-0.5 hidden data-[orientation=vertical]:h-4 sm:block"
        />

        <Button size="sm" className="hidden sm:inline-flex">
          <PlusIcon className="size-3.5" />
          Invite
        </Button>
      </div>
    </header>
  )
}
