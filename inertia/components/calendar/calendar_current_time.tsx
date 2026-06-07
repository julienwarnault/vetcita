import { useEffect, useState } from 'react'
import { getMinutesInDay, now } from '~/lib/date'

interface CalendarCurrentTimeProps {
  ratio: number
}

export function CalendarCurrentTime(props: CalendarCurrentTimeProps) {
  const { ratio } = props

  const [currentTime, setCurrentTime] = useState(now())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(now())
    }, 60_000)

    return () => clearInterval(interval)
  }, [])

  const startInMinutes = getMinutesInDay(currentTime)

  return (
    <div
      className="pointer-events-none absolute z-21 bg-red-500 h-0.5 w-full inset-x-0"
      style={{ top: ratio * startInMinutes }}
    />
  )
}
