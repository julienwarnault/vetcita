import { Info } from 'luxon'
import { type Event, getMonthDays, mapEvents } from '~/lib/calendar'
import { CalendarDayCell } from './calendar_day_cell'
import { dayId, DEFAULT_LOCALE } from '~/lib/date'
import { capitalize } from '~/lib/utils'

interface CalendarMonthViewProps {
  date: string
  events: Event[]
  onEventClick?: (event: Event) => void
}

export function CalendarMonthView(props: CalendarMonthViewProps) {
  const { date, events, onEventClick } = props

  const days = getMonthDays(date)
  const eventsMap = mapEvents(events)

  const weekdays = Info.weekdays('long', { locale: DEFAULT_LOCALE })

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 grid grid-cols-7 bg-surface shadow-sm">
        {weekdays.map((day, index) => (
          <div key={index} className="p-3">
            <span className="text-[15px] font-medium leading-5">{capitalize(day)}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, index) => (
          <CalendarDayCell
            key={index}
            day={day}
            events={eventsMap.get(dayId(day)) ?? []}
            maxVisible={3}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  )
}
