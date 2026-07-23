import { DateTime } from 'luxon'
import { cn } from 'tailwind-variants'
import { CalendarEventPreviewCard } from './calendar_event_preview_card'
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
      <button
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
            <CalendarEventPreviewCard key={event.id} event={event}>
              <div
                className={cn(
                  'relative flex rounded-sm p-1 z-2 cursor-pointer',
                  'after:hidden after:absolute after:content-empty after:inset-0 after:border-2 after:rounded-sm hover:after:block hover:after:border-accent'
                )}
                style={{ backgroundColor: event.color }}
                onClick={() => onEventClick?.(event)}
              >
                <div className="flex gap-1 overflow-hidden whitespace-nowrap">
                  <div className="text-[13px]/4 font-normal">{event.start.toFormat('h:mm')}</div>
                  <div className="text-[13px]/4 font-semibold">{event.client?.fullName}</div>
                </div>
              </div>
            </CalendarEventPreviewCard>
          ))}
          {remaining > 0 && (
            <div className="px-4 py-1 text-center text-[11px] text-foreground">{remaining} otro(s)</div>
          )}
        </>
      </button>
    </CalendarDayMenu>
  )
}
