/**
 * The shared mark. Authored SVG rather than an emoji or an icon-font glyph, so
 * it keeps one stroke weight with the rest of the icon set at every size.
 */
export function SiteLogo({ className }: { className?: string }) {
  return (
    <span
      className={
        'bg-primary text-primary-foreground flex aspect-square size-6 items-center justify-center rounded-md ' +
        (className ?? '')
      }
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M4 17.5 9.5 11l4 4L20 6.5" />
      </svg>
    </span>
  )
}
