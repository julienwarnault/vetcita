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
}>

export default function ShowCalendar(props: PageProps) {
  const { date, view, appointments } = props

  const { user } = usePageProps()

  const debounced = useDebouncedCallback(() => {
    router.reload({ only: ['appointments'] })
  }, 2_000)

  useSubscribe({ channel: `tenants/${user?.tenantId}/appointments`, onMessage: debounced })

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <CalendarToolbar date={date} view={view} />

      <div className="flex flex-1 overflow-hidden">
        <Calendar
          date={date}
          view={view}
          events={appointments.map((appointment) => ({
            id: appointment.id,
            start: DateTime.fromISO(appointment.startDate!, { zone: DEFAULT_TIMEZONE }),
            end: DateTime.fromISO(appointment.endDate!, { zone: DEFAULT_TIMEZONE }),
            duration: appointment.duration,
            patientFullName: appointment.patient!.fullName,
            patientPhone: appointment.patient!.phone,
            patientEmail: appointment.patient!.email ?? undefined,
            typeName: appointment.appointmentType!.name,
            color: appointment.appointmentType!.color,
            bookingRef: appointment.bookingRef,
            agenda: appointment.agenda!.name,
          }))}
        />
      </div>
    </div>
  )
}
