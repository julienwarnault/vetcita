import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { CalendarToolbar } from '~/components/calendar/calendar_toolbar'
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
          }))}
        />
      </div>
    </div>
  )
}
