import { cn } from 'tailwind-variants'
import { Data } from '@generated/data'
import { BookingForm } from './use_booking_form'
import { formatDuration } from '~/lib/utils'

interface StepAppointmentTypeProps {
  form: BookingForm
  appointmentTypes: Data.AppointmentTypes.AppointmentType[]
}

export function StepAppointmentType({ appointmentTypes, form }: StepAppointmentTypeProps) {
  const { data, setData } = form

  return (
    <ul className="flex flex-col gap-4">
      {appointmentTypes.map((type) => (
        <li key={type.id}>
          <button
            type="button"
            onClick={() => {
              setData('appointmentTypeId', type.id)
              setData('startDate', '')
            }}
            className={cn(
              'flex items-center justify-between border bg-white rounded-lg p-4 w-full hover:bg-background',
              data.appointmentTypeId === type.id && 'outline-2 -outline-offset-1 outline-accent'
            )}
          >
            <div>{type.name}</div>
            <div>{formatDuration(type.duration)}</div>
          </button>
        </li>
      ))}
    </ul>
  )
}
