import { useEffect } from 'react'

export function useKeyPress(targetKey: string, handler: () => void, enable: boolean = true) {
  useEffect(() => {
    function keyDownHandler(event: KeyboardEvent) {
      if (!enable) return

      if (event.target !== document.body) {
        return
      }

      if (event.key === targetKey) {
        event.preventDefault()
        handler()
      }
    }
    window.addEventListener('keydown', keyDownHandler)

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [targetKey, handler, enable])
}
