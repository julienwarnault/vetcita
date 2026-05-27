import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { formatDuration, formatPhoneNumber } from '~/lib/utils'
import { BookingForm } from './use_booking_form'
import { DEFAULT_TIMEZONE } from '~/lib/date'
import { Card } from '../ui/card'

interface StepReviewProps {
  form: BookingForm
  appointmentType: Data.AppointmentTypes.AppointmentType
  tenant: Data.Tenants.Tenant
}

export function StepReview({ appointmentType, tenant, form }: StepReviewProps) {
  const { data } = form

  const startDateTime = data.startDate
    ? DateTime.fromISO(data.startDate, { zone: DEFAULT_TIMEZONE })
    : null
  const formattedDate = startDateTime?.setLocale('es-MX').toFormat('EEEE, d MMMM yyyy')
  const formattedTime = startDateTime?.toFormat('hh:mma')

  return (
    <Card shadow={false} className="divide-y">
      <div className="p-4">
        <div className="text-sm text-muted-foreground">Consultorio</div>
        <div className="font-semibold text-lg">{tenant.name}</div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div>
          <div className="font-semibold text-lg">{appointmentType.name}</div>
          <div className="text-sm text-muted-foreground mt-1">
            Duración: {formatDuration(appointmentType.duration)}
          </div>
        </div>

        <div>
          <div className="font-semibold text-lg capitalize">{formattedDate}</div>
          <div className="text-sm text-muted-foreground mt-1">{formattedTime}</div>
        </div>
      </div>

      <div className="p-4">
        <div className="font-semibold text-lg">
          {data.firstName} {data.lastName}
        </div>
        <div className="flex flex-col gap-1 mt-2 text-sm">
          <div className="text-muted-foreground">
            <span className="font-medium">Teléfono:</span> {formatPhoneNumber(data.phone)}
          </div>
          {data.email && (
            <div className="text-muted-foreground">
              <span className="font-medium">Email:</span> {data.email}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
