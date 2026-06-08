import { cn } from 'tailwind-variants'
import { useIsFirstRender } from '@uidotdev/usehooks'
import { CSSProperties, useEffect, useRef } from 'react'
import { buildDaySlots, type Event, getDaysFromView, getRatio, mapEvents } from '~/lib/calendar'
import { dayId, getMinutesInDay, isPastDate, isToday, now } from '~/lib/date'
import { CalendarCurrentTime } from './calendar_current_time'
import { CalendarEvent } from './calendar_event'
import { capitalize } from '~/lib/utils'

interface CalendarDaysViewProps {
  date: string
  view: 'day' | '3_day' | 'week'
  events: Event[]
  onEventClick?: (event: Event) => void
}

export function CalendarDaysView(props: CalendarDaysViewProps) {
  const { date, view, events, onEventClick } = props

  const isFirstRender = useIsFirstRender()

  const contentRef = useRef<HTMLDivElement>(null)

  const days = getDaysFromView(date, view)
  const eventsMap = mapEvents(events)

  useEffect(() => {
    if (isFirstRender) {
      const startInMinutes = getMinutesInDay(now())
      const top = getRatio() * startInMinutes
      const height = Math.max(0, (contentRef.current?.clientHeight || 0) - 72)
      contentRef.current?.scrollTo({ top: top - height / 2, behavior: 'instant' })
    }
  }, [isFirstRender])

  return (
    <div
      ref={contentRef}
      className="flex-1 overflow-x-hidden overflow-y-scroll bg-white overscroll-none"
    >
      <div className="relative" style={{ '--days': days.length } as CSSProperties}>
        <div className="sticky top-0 z-30 grid h-18 grid-cols-[48px_repeat(var(--days),1fr)] bg-white shadow-sm">
          <div />
          {days.map((day, index) => {
            const isPastDay = isPastDate(day)
            const isCurrentDay = isToday(day)

            return (
              <div key={index} className="p-1">
                <div className="flex h-full w-full items-center gap-1.5 rounded-md pl-2">
                  <div
                    className={cn(
                      'flex size-10 items-center justify-center rounded-full text-[17px] font-medium',
                      isPastDay && 'text-foreground',
                      isCurrentDay ? 'bg-accent text-white' : 'bg-gray-50'
                    )}
                  >
                    {day.toFormat('d')}
                  </div>
                  <div
                    className={cn(
                      'text-[15px] font-medium',
                      isPastDay && 'text-foreground',
                      isCurrentDay && 'text-accent'
                    )}
                  >
                    {capitalize(day.toFormat('cccc'))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="relative grid grid-cols-[48px_repeat(var(--days),1fr)]">
          <div className="z-10 flex w-12 flex-col bg-white">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className="flex h-6 items-center justify-center first:pt-4"
                style={{ marginBottom: 72 }}
              >
                <div className="flex flex-col items-end font-semibold leading-3">
                  <div className="text-[13px] font-semibold">{((index + 1 + 10) % 12) + 1}:00</div>
                  <div className="text-xs font-medium">{index >= 12 ? 'pm' : 'am'}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute inset-0">
            {Array.from({ length: 24 * 4 }).map((_, index) => (
              <div key={index} className={cn('h-6 border-t', index % 4 && 'opacity-30')} />
            ))}
          </div>

          {days.map((day, index) => {
            const id = dayId(day)
            const dayEvents = eventsMap.get(id) ?? []
            const daySlots = buildDaySlots(dayEvents)
            const isCurrentDay = isToday(day)

            return (
              <div key={index} className="relative border-l border-input">
                {dayEvents.map((event) => (
                  <CalendarEvent
                    key={event.id}
                    ratio={getRatio()}
                    slot={daySlots.get(event.id) ?? ({ index: 0, columns: 1 } as any)}
                    event={event}
                    onClick={onEventClick}
                  />
                ))}
                {isCurrentDay && <CalendarCurrentTime ratio={getRatio()} />}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
