import { DateTime } from 'luxon'
import { cn } from 'tailwind-variants'
import { CalendarDayEventsMenu } from './calendar_day_events_menu'
import { CalendarDayEvent } from './calendar_day_event'
import { CalendarDayMenu } from './calendar_day_menu'
import { isPastDate, isToday } from '~/lib/date'
import { Event } from '~/lib/calendar'

interface CalendarDayCellProps {
  day: DateTime
  events: Event[]
  maxVisible?: number
  onEventClick?: (event: Event) => void
}

export function CalendarDayCell(props: CalendarDayCellProps) {
  const { day, events, maxVisible = 3, onEventClick } = props

  const isPast = isPastDate(day)
  const isCurrent = isToday(day)
  const isFirstDay = day.day === 1
  const visible = events.slice(0, maxVisible)
  const remaining = events.length - maxVisible

  return (
    <CalendarDayMenu day={day}>
      <div
        className={cn(
          'group relative flex flex-col gap-1 p-1.5 hover:bg-accent-faded',
          'hover:z-1 cursor-pointer',
          'after:absolute after:content-empty after:-inset-px after:border hover:after:border-accent',
          isPast ? 'stripes hover:bg-none' : 'bg-white'
        )}
        style={{ height: 156 }}
      >
        <div className="inline-flex">
          <span
            className={cn(
              'text-[13px]/4 font-semibold leading-5',
              'lowercase text-foreground',

              isCurrent && 'rounded-full bg-accent px-1.5 text-white'
            )}
          >
            {day.toFormat(isFirstDay ? 'd MMMM' : 'd')}
          </span>
        </div>

        <>
          {visible.map((event) => (
            <CalendarDayEvent key={event.id} event={event} onEventClick={onEventClick} />
          ))}
          {remaining > 0 && (
            <CalendarDayEventsMenu day={day} events={events} onEventClick={onEventClick}>
              <button className="px-4 py-1 text-center text-[11px] text-foreground z-1">{remaining} otro(s)</button>
            </CalendarDayEventsMenu>
          )}
        </>
      </div>
    </CalendarDayMenu>
  )
}
