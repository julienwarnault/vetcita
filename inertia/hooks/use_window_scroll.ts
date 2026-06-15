import { useLayoutEffect, useRef, useState } from 'react'

interface ScrollState {
  x: number | null
  y: number | null
}

function findScrollTarget(el: Element | null): Element {
  let current = el
  while (current) {
    if (current.getAttribute('role') === 'dialog') return current
    current = current.parentElement
  }
  return document.body
}

export function useWindowScroll() {
  const anchorRef = useRef<HTMLDivElement>(null)

  const [state, setState] = useState<ScrollState>({ x: null, y: null })

  useLayoutEffect(() => {
    const target = findScrollTarget(anchorRef.current)
    const isBody = target === document.body
    const eventTarget: EventTarget = isBody ? window : target

    const handleScroll = () => {
      setState(
        isBody
          ? { x: window.scrollX, y: window.scrollY }
          : { x: (target as HTMLElement).scrollLeft, y: (target as HTMLElement).scrollTop }
      )
    }

    handleScroll()
    eventTarget.addEventListener('scroll', handleScroll)

    return () => {
      eventTarget.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return [state, anchorRef] as const
}
