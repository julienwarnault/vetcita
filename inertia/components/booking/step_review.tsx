import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { formatDuration, formatPhoneNumber } from '~/lib/utils'
import { BookingForm, StepKey } from './use_booking_form'
import { DEFAULT_TIMEZONE } from '~/lib/date'
import { Card } from '../ui/card'

interface StepReviewProps {
  form: BookingForm
  service?: Data.Services.Service
  species?: Data.Pets.Species
  tenant: Data.Tenants.Tenant
  stepKey: StepKey
}

export function StepReview(props: StepReviewProps) {
  const { service, species, tenant, form, stepKey } = props
  const { data } = form

  const startDateTime = data.startDate ? DateTime.fromISO(data.startDate, { zone: DEFAULT_TIMEZONE }) : null
  const formattedDate = startDateTime?.setLocale('es-MX').toFormat('EEEE, d MMMM yyyy')
  const formattedTime = startDateTime?.toFormat('hh:mma')

  return (
    <Card shadow={false} className="divide-y">
      <div className="p-4">
        <div className="text-sm text-muted-foreground">Negocio</div>
        <div className="font-semibold text-lg">{tenant.name}</div>
      </div>

      {['datetime', 'infos', 'pet', 'review'].includes(stepKey) && (
        <div className="flex flex-col p-4">
          <div className="font-semibold text-lg">{service?.name}</div>
          <div className="text-sm text-muted-foreground mt-1">Duración: {formatDuration(service?.duration || 0)}</div>
        </div>
      )}

      {['infos', 'pet', 'review'].includes(stepKey) && (
        <div className="flex flex-col p-4">
          <div className="font-semibold text-lg capitalize">{formattedDate}</div>
          <div className="text-sm text-muted-foreground mt-1">{formattedTime}</div>
        </div>
      )}

      {['pet', 'review'].includes(stepKey) && (
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
      )}

      {['review'].includes(stepKey) && (
        <div className="flex flex-col p-4">
          <div className="font-semibold text-lg">{data.petName}</div>
          <div className="text-sm text-muted-foreground mt-1">{species?.name}</div>
        </div>
      )}
    </Card>
  )
}
