import Link from 'next/link'
import { ArrowRightIcon, MoreHorizontalIcon } from 'lucide-react'

import { formatCurrency, type Customer } from '@/lib/dashboard-data'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { EmptyState } from '@/components/dashboard/empty-state'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function initials(name: string) {
  return name
    .replace(/[^\p{L}\s]/gu, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function CustomersTable({
  customers,
  caption = 'The eight most recently active accounts.',
}: {
  customers: Customer[]
  caption?: string
}) {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>{caption}</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/customers">
              View all
              <ArrowRightIcon className="size-3.5" />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="px-0">
        {customers.length === 0 ? (
          <div className="px-6">
            <EmptyState
              title="No customers yet"
              description="Accounts appear here as soon as someone signs up. Invite a teammate or share your signup link to get the first one."
              actionLabel="Invite a teammate"
            />
          </div>
        ) : (
          /* The table scrolls inside its own container so a narrow viewport
             never pushes the page sideways. */
          <div className="w-full overflow-x-auto">
            {/* A min-width so narrow viewports scroll the table instead of
                crushing the name column — without it the customer names
                compressed to one or two characters plus an ellipsis. */}
            <Table className="min-w-184">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="ps-6">Customer</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">MRR</TableHead>
                  <TableHead className="text-right">Seats</TableHead>
                  <TableHead className="w-10 pe-6">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="ps-6">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-7 shrink-0 rounded-md">
                          <AvatarFallback className="rounded-md text-[10px]">
                            {initials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid min-w-0 leading-tight">
                          <span className="truncate font-medium">
                            {customer.name}
                          </span>
                          <span className="text-muted-foreground truncate text-xs">
                            {customer.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      {customer.plan}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={customer.status} />
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {customer.mrr === 0 ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        formatCurrency(customer.mrr)
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-right">
                      {customer.seats === 0 ? '—' : customer.seats}
                    </TableCell>
                    <TableCell className="pe-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            className="text-muted-foreground hover:text-foreground"
                            aria-label={`Actions for ${customer.name}`}
                          >
                            <MoreHorizontalIcon className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem>View account</DropdownMenuItem>
                          <DropdownMenuItem>Open invoices</DropdownMenuItem>
                          <DropdownMenuItem>Email customer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">
                            Cancel subscription
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {customers.length > 0 && (
        <CardFooter className="text-muted-foreground justify-between border-t pt-4 text-sm">
          <span>
            Showing <span className="tabular">{customers.length}</span> of{' '}
            <span className="tabular">248</span>
          </span>
          <div className="flex gap-1.5">
            {/* Disabled rather than hidden: the control's existence tells you
                where you are in the set. */}
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
