import type { Metadata } from 'next'

import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { verifySession } from '@/lib/auth/dal'

export const metadata: Metadata = { title: 'Settings' }

export default async function SettingsPage() {
  // This page renders no data of its own, so there is nothing in
  // lib/dashboard/data.ts to carry the guard for it. Layouts do not
  // re-render on client-side navigation, so the check has to be here.
  await verifySession()

  return (
    <>
      <DashboardHeader
        crumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Settings' },
        ]}
      />
      <main className="flex flex-1 flex-col gap-4 p-3 md:gap-5 md:p-5">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground text-sm">
            Workspace name, locale and billing contact.
          </p>
        </div>

        <div className="grid max-w-2xl gap-4 md:gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Workspace</CardTitle>
              <CardDescription>
                Shown to everyone with access to this workspace.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="workspace-name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="workspace-name" defaultValue="Acme Inc." />
              </div>

              <div className="grid gap-2">
                <label htmlFor="billing-email" className="text-sm font-medium">
                  Billing email
                </label>
                <Input
                  id="billing-email"
                  type="email"
                  defaultValue="billing@acme.com"
                  aria-describedby="billing-email-hint"
                />
                <p
                  id="billing-email-hint"
                  className="text-muted-foreground text-xs"
                >
                  Invoices and dunning notices go here, not to individual
                  members.
                </p>
              </div>

              <div className="grid gap-2">
                <label htmlFor="timezone" className="text-sm font-medium">
                  Reporting timezone
                </label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone" className="w-full sm:w-72">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="npt">Nepal Time (UTC+05:45)</SelectItem>
                    <SelectItem value="cet">Central European Time</SelectItem>
                    <SelectItem value="pt">Pacific Time</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-muted-foreground text-xs">
                  Metric windows and exports are bucketed in this timezone.
                </p>
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2 border-t pt-4">
              <Button variant="ghost" size="sm">
                Discard
              </Button>
              <Button size="sm">Save changes</Button>
            </CardFooter>
          </Card>

          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle>Delete workspace</CardTitle>
              <CardDescription>
                Removes all accounts, invoices and metric history. This cannot
                be undone and takes effect immediately.
              </CardDescription>
            </CardHeader>
            <CardFooter className="border-t pt-4">
              <Button variant="destructive" size="sm">
                Delete workspace
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  )
}
