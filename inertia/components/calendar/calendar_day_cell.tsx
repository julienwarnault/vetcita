import { DateTime } from 'luxon'
import { cn } from 'tailwind-variants'
import { isPastDate, isToday } from '~/lib/date'

interface CalendarDayCellProps {
  day: DateTime
}

export function CalendarDayCell(props: CalendarDayCellProps) {
  const { day } = props

  const isPast = isPastDate(day)
  const isCurrent = isToday(day)
  const isFirstDay = day.day === 1

  return (
    <div
      className={cn(
        'group relative flex flex-col gap-1 p-1.5 bg-white hover:bg-accent-faded',
        'hover:z-1',
        'after:absolute after:content-empty after:-inset-px after:border hover:after:border-accent'
      )}
      style={{ height: 156 }}
    >
      <div className="inline-flex">
        <span
          className={cn(
            'text-[13px]/4 font-semibold leading-5',
            isPast && 'lowercase text-foreground',
            isCurrent && 'rounded-full bg-accent px-1.5 text-white'
          )}
        >
          {day.toFormat(isFirstDay ? 'd MMMM' : 'd')}
        </span>
      </div>
    </div>
  )
}
