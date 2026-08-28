import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

/**
 * Chrome for the public site. A route group, so it wraps every marketing page
 * without adding a segment to the URL — this layout owns "/" while
 * app/dashboard keeps its own shell entirely separate.
 */
export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter />
    </>
  )
}
