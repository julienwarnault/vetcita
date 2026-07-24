import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { formatDuration } from '~/lib/utils'
import { DEFAULT_LOCALE } from '~/lib/date'
import { urlFor } from '~/lib/tuyau'
import { Badge } from './ui/badge'

interface AppointmentItemProps {
  appointment: Data.Booking.Appointment
}

export function AppointmentItem(props: AppointmentItemProps) {
  const { appointment } = props

  const { visitModal } = useModalStack()

  const startDate = DateTime.fromISO(appointment.localStartDate!)

  return (
    <button
      className="flex not-last:border-b w-full px-6 hover:bg-background"
      onClick={() => visitModal(urlFor('update_appointment.render', { id: appointment.id }))}
    >
      <div className="flex flex-row items-start py-5">
        <div className="flex flex-col mr-4 text-center">
          <span className="text-[17px]/6 font-semibold">{startDate.setLocale(DEFAULT_LOCALE).toFormat('d')}</span>
          <span className="text-[15px]/5">{startDate.setLocale(DEFAULT_LOCALE).toFormat('LLL.')}</span>
        </div>
        <div className="flex flex-col text-left">
          <div className="flex gap-2">
            <div className="text-[15px]/5 text-muted">
              {`${startDate.setLocale(DEFAULT_LOCALE).toFormat('ccc.').toLowerCase()} ${startDate.toFormat('h:mma').toLowerCase()}`}
            </div>
            <Badge size="md" color={appointment.status?.color}>
              {appointment?.status?.name}
            </Badge>
          </div>
          <div className="flex flex-col">
            <div className="text-[17px]/6 font-semibold">{appointment.appointmentType?.name}</div>
            <div className="text-[15px]/5 text-muted">
              {`${appointment.pet?.name}, ${formatDuration(appointment.duration)} con ${appointment.agenda?.name}`.trim()}
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
