import { onBeforeUnmount, watch } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface SectionScrollSpyOptions {
  route: RouteLocationNormalizedLoaded
  sectionHrefs: () => readonly string[]
  setActiveHref: (href: string) => void
  rootMargin?: string
  minSwitchIntervalMs?: number
}

function pickActiveHref(visible: IntersectionObserverEntry[]): string | null {
  if (!visible.length) return null
  let best = visible[0]
  for (let i = 1; i < visible.length; i += 1) {
    const e = visible[i]
    if (e.intersectionRatio > best.intersectionRatio) {
      best = e
    } else if (
      e.intersectionRatio === best.intersectionRatio &&
      e.boundingClientRect.top < best.boundingClientRect.top
    ) {
      best = e
    }
  }
  const id = best.target.id
  return id ? `#${id}` : null
}

export function useSectionScrollSpy(options: SectionScrollSpyOptions): void {
  let observer: IntersectionObserver | null = null
  const latestByTarget = new Map<Element, IntersectionObserverEntry>()
  let trailingTimer: ReturnType<typeof setTimeout> | null = null
  let pendingHref: string | null = null
  let lastCommitAt = 0

  function flushTrailing(): void {
    trailingTimer = null
    if (pendingHref) {
      options.setActiveHref(pendingHref)
      lastCommitAt = performance.now()
      pendingHref = null
    }
  }

  function scheduleSetActiveHref(href: string): void {
    const minGap = options.minSwitchIntervalMs ?? 100
    const elapsed = performance.now() - lastCommitAt
    pendingHref = href
    if (elapsed >= minGap) {
      if (trailingTimer !== null) { clearTimeout(trailingTimer); trailingTimer = null }
      options.setActiveHref(href)
      lastCommitAt = performance.now()
      pendingHref = null
      return
    }
    if (trailingTimer !== null) clearTimeout(trailingTimer)
    trailingTimer = setTimeout(flushTrailing, minGap - elapsed)
  }

  function disconnect(): void {
    if (trailingTimer !== null) { clearTimeout(trailingTimer); trailingTimer = null }
    pendingHref = null
    observer?.disconnect()
    observer = null
    latestByTarget.clear()
  }

  function connect(): void {
    disconnect()
    if (options.route.path !== '/') return

    lastCommitAt = performance.now()

    const elements = options.sectionHrefs()
      .map(h => document.getElementById(h.replace(/^#/, '')))
      .filter((el): el is HTMLElement => el !== null)

    if (!elements.length) return

    // Зона «активная секция» — центральные 30% экрана.
    // При таком узком окне в зоне одновременно находится максимум одна секция,
    // поэтому мигания при скролле нет — observer просто молчит пока
    // следующая секция не войдёт в центр экрана.
    const rootMargin = options.rootMargin ?? '-35% 0px -35% 0px'

    observer = new IntersectionObserver(
      entries => {
        for (const e of entries) latestByTarget.set(e.target, e)
        const visible = [...latestByTarget.values()].filter(
          e => e.isIntersecting && e.intersectionRatio > 0 && e.target.id,
        )
        const href = pickActiveHref(visible)
        if (href) scheduleSetActiveHref(href)
      },
      { root: null, rootMargin, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    )

    for (const el of elements) observer.observe(el)
  }

  function scheduleConnect(): void {
    const maxAttempts = 40
    function tryConnect(attempt: number): void {
      if (options.route.path !== '/') return
      const ids = options.sectionHrefs().map(h => h.replace(/^#/, ''))
      const allPresent = ids.length > 0 && ids.every(id => document.getElementById(id) !== null)
      if (!allPresent && attempt < maxAttempts) {
        requestAnimationFrame(() => tryConnect(attempt + 1))
        return
      }
      connect()
    }
    requestAnimationFrame(() => tryConnect(0))
  }

  watch(
    () => options.route.path,
    path => {
      disconnect()
      if (path === '/') scheduleConnect()
    },
    { flush: 'post' },
  )

  scheduleConnect()

  onBeforeUnmount(() => { disconnect() })
}
