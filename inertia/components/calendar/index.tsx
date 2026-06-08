import { useState } from 'react'
import { CalendarEventDrawer } from './calendar_event_drawer'
import { CalendarMonthView } from './calendar_month_view'
import { CalendarDaysView } from './calendar_days_view'
import { Event } from '~/lib/calendar'

interface CalendarViewProps {
  date: string
  view: 'day' | '3_day' | 'week' | 'month'
  events: Event[]
}

export function Calendar(props: CalendarViewProps) {
  const { date, view, events } = props

  const [event, setEvent] = useState<Event | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleEventClick = (event: Event) => {
    setEvent(event)
    setIsOpen(true)
  }

  const handleDrawerClose = () => {
    setIsOpen(false)
    setTimeout(() => setEvent(null), 300)
  }

  return (
    <>
      {view !== 'month' && (
        <CalendarDaysView date={date} view={view} events={events} onEventClick={handleEventClick} />
      )}
      {view === 'month' && (
        <CalendarMonthView date={props.date} events={events} onEventClick={handleEventClick} />
      )}

      <CalendarEventDrawer open={isOpen} event={event} onClose={handleDrawerClose} />
    </>
  )
}
