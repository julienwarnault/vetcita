import { useModalStack } from '@inertiaui/modal-react'
import { CalendarMonthView } from './calendar_month_view'
import { CalendarDaysView } from './calendar_days_view'
import { Event } from '~/lib/calendar'
import { urlFor } from '~/lib/tuyau'

interface CalendarViewProps {
  date: string
  view: 'day' | '3_day' | 'week' | 'month'
  events: Event[]
}

export function Calendar(props: CalendarViewProps) {
  const { date, view, events } = props

  const { visitModal, stack, closeAll } = useModalStack()

  const handleEventClick = (event: Event) => {
    const topModal = stack.find((s) => s.onTopOfStack)

    if (topModal) {
      if (topModal.response?.component === 'appointments/show') {
        topModal.response.url = `/appointments/${event.id}`
        topModal.reload()
        return
      } else {
        closeAll(true)
      }
    }
    visitModal(urlFor('get_appointment.render', { id: event.id }))
  }

  return (
    <>
      {view !== 'month' && (
        <CalendarDaysView date={date} view={view} events={events} onEventClick={handleEventClick} />
      )}
      {view === 'month' && (
        <CalendarMonthView date={props.date} events={events} onEventClick={handleEventClick} />
      )}
    </>
  )
}
