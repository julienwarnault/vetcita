import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { useDebouncedCallback } from 'use-debounce'
import { CalendarToolbar } from '~/components/calendar/calendar_toolbar'
import { useSubscribe } from '~/hooks/use_subscribe'
import usePageProps from '~/hooks/use_page_props'
import { Calendar } from '~/components/calendar'
import { DEFAULT_TIMEZONE } from '~/lib/date'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  date: string
  view: 'day' | '3_day' | 'week' | 'month'
  appointments: Data.Booking.Appointment[]
  agendas: Data.Agendas.Agenda[]
  agendaIds?: string[]
}>

export default function ShowCalendar(props: PageProps) {
  const { date, view, appointments, agendas, agendaIds } = props

  const { user } = usePageProps()

  const debounced = useDebouncedCallback(() => {
    router.reload({ only: ['appointments'] })
  }, 2_000)

  useSubscribe({ channel: `tenants/${user?.agenda?.tenantId}/appointments`, onMessage: debounced })

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <CalendarToolbar date={date} view={view} agendas={agendas} agendaIds={agendaIds} />

      <div className="flex flex-1 overflow-hidden">
        <Calendar
          date={date}
          view={view}
          events={appointments.map((appointment) => ({
            id: appointment.id,
            start: DateTime.fromISO(appointment.startDate!, { zone: DEFAULT_TIMEZONE }),
            end: DateTime.fromISO(appointment.endDate!, { zone: DEFAULT_TIMEZONE }),
            duration: appointment.duration,
            client: {
              fullName: appointment.client!.fullName,
              phone: appointment.client!.phone,
              email: appointment.client!.email ?? undefined,
            },
            pet: {
              name: appointment.pet!.name,
              illustrationUrl: appointment.pet!.species!.illustrationUrl,
            },
            status: {
              name: appointment.status!.name,
              color: appointment.status!.color,
              icon: appointment.status!.icon,
              isDefault: appointment.status!.sortOrder === 1,
            },
            typeName: appointment.service!.name,
            color: appointment.service!.color,
            bookingRef: appointment.bookingRef,
            agenda: {
              fullName: appointment.agenda!.fullName,
              color: appointment.agenda!.color,
            },
          }))}
        />
      </div>
    </div>
  )
}
