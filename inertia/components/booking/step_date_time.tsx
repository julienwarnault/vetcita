import { StartDatePicker } from './start_date_picker'
import { BookingForm } from './use_booking_form'

interface StepDateTimeProps {
  form: BookingForm
}

export function StepDateTime({ form }: StepDateTimeProps) {
  const { data, setData } = form

  return (
    <>
      <StartDatePicker
        tenantId={data.tenantId}
        appointmentTypeId={data.appointmentTypeId}
        value={data.startDate || undefined}
        startDate={data.startDate || undefined}
        onValueChange={(start, agendaId) => {
          setData('startDate', start)
          setData('agendaId', agendaId)
        }}
      />
    </>
  )
}
