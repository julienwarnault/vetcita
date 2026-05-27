import { useQuery } from '@tanstack/react-query'
import { nextAvailableSlotQueryOptions } from '~/lib/queries'
import { TimeSlotPicker } from './time_slot_picker'
import { BookingForm } from './use_booking_form'
import { today } from '~/lib/date'

interface StepDateTimeProps {
  form: BookingForm
}

export function StepDateTime({ form }: StepDateTimeProps) {
  const { data, setData } = form

  const { data: nextAvailable, isLoading } = useQuery({
    ...nextAvailableSlotQueryOptions({
      tenantId: data.tenantId,
      from: today().toFormat('yyyy-MM-dd'),
    }),
    staleTime: 5_000,
    enabled: Boolean(data.tenantId),
  })

  if (isLoading) {
    return null
  }

  return (
    <TimeSlotPicker
      tenantId={data.tenantId}
      value={data.startDate}
      startDate={data.startDate || nextAvailable?.date}
      onValueChange={(value) => setData('startDate', value)}
    />
  )
}
