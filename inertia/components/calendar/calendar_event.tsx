import { cn } from 'tailwind-variants'
import { CalendarEventPreviewCard } from './calendar_event_preview_card'
import type { EventSlot, Event } from '~/lib/calendar'
import { getMinutesInDay } from '~/lib/date'

interface CalendarEventProps {
  event: Event
  slot: EventSlot
  ratio: number
  onClick?: (event: Event) => void
}

export function CalendarEvent(props: CalendarEventProps) {
  const { event, slot, ratio, onClick } = props

  const startInMinutes = getMinutesInDay(event.start)
  const columnPercentage = 100 / slot.columns

  return (
    <CalendarEventPreviewCard event={event}>
      <div
        className={cn(
          'absolute z-20 cursor-pointer overflow-hidden whitespace-nowrap rounded-sm py-0.75 pl-2 pr-1',
          'after:hidden after:absolute after:content-empty after:inset-0 after:border-2 hover:after:block hover:after:border-accent'
        )}
        style={{
          top: ratio * startInMinutes,
          height: ratio * event.duration - 1,
          left: `calc(${slot.index * columnPercentage}% + 3px)`,
          right: `calc(${(slot.columns - slot.index - 1) * columnPercentage}% + 4px)`,
          backgroundColor: event.agenda.color,
        }}
        onClick={() => onClick?.(event)}
      >
        <div className="flex flex-wrap items-center gap-1">
          <div className="text-[13px]/4">
            {event.start.toFormat('h:mm')}&nbsp;-&nbsp;
            {event.end.toFormat('h:mm')}
          </div>
          <strong className="overflow-visible text-[13px]/4 font-semibold">{event.pet.name}</strong>
        </div>
        <div className="overflow-hidden text-[13px]/4">{event.typeName}</div>
      </div>
    </CalendarEventPreviewCard>
  )
}
