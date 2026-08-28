import * as React from 'react'

const MOBILE_BREAKPOINT = 768
const QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

/**
 * Rewritten from the shadcn default, which set state inside an effect and so
 * tripped react-hooks/set-state-in-effect (it also caused a cascading render
 * on every mount). useSyncExternalStore is the intended API for reading from
 * an external source like matchMedia.
 *
 * Note: `shadcn add sidebar` will overwrite this file — reapply if that happens.
 */
function subscribe(onStoreChange: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', onStoreChange)
  return () => mql.removeEventListener('change', onStoreChange)
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches
}

// The server has no viewport. Reporting desktop matches the sidebar's own
// default state, so hydration does not flip the layout for desktop visitors.
function getServerSnapshot() {
  return false
}

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
