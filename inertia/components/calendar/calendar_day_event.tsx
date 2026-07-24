import { cn } from 'tailwind-variants'
import { CalendarEventPreviewCard } from './calendar_event_preview_card'
import { Event } from '~/lib/calendar'

interface CalendarDayEventProps {
  event: Event
  onEventClick?: (event: Event) => void
}

export function CalendarDayEvent(props: CalendarDayEventProps) {
  const { event, onEventClick } = props

  return (
    <CalendarEventPreviewCard key={event.id} event={event}>
      <div
        className={cn(
          'relative flex rounded-sm p-1 z-2 cursor-pointer',
          'after:hidden after:absolute after:content-empty after:inset-0 after:border-2 after:rounded-sm hover:after:block hover:after:border-accent'
        )}
        style={{ backgroundColor: event.agenda.color }}
        onClick={() => onEventClick?.(event)}
      >
        <div className="flex gap-1 overflow-hidden whitespace-nowrap">
          <div className="text-[13px]/4 font-normal">{event.start.toFormat('h:mm')}</div>
          <div className="text-[13px]/4 font-semibold">{event.pet?.name}</div>
        </div>
      </div>
    </CalendarEventPreviewCard>
  )
}
