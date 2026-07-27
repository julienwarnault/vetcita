import { cn } from 'tailwind-variants'
import { Data } from '@generated/data'
import { BookingForm } from './use_booking_form'
import { formatDuration } from '~/lib/utils'

interface StepServiceProps {
  form: BookingForm
  services: Data.Services.Service[]
}

export function StepService({ services, form }: StepServiceProps) {
  const { data, setData } = form

  return (
    <ul className="flex flex-col gap-4">
      {services.map((service) => (
        <li key={service.id}>
          <button
            type="button"
            onClick={() => {
              setData('serviceId', service.id)
              setData('startDate', '')
            }}
            className={cn(
              'flex items-center justify-between border bg-white rounded-lg p-4 w-full hover:bg-background',
              data.serviceId === service.id && 'outline-2 -outline-offset-1 outline-accent'
            )}
          >
            <div>{service.name}</div>
            <div>{formatDuration(service.duration)}</div>
          </button>
        </li>
      ))}
    </ul>
  )
}
