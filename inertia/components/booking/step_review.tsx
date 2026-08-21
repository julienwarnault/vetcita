import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { MapPinIcon } from 'lucide-react'
import { Link } from '@adonisjs/inertia/react'
import { formatDuration, formatPhoneNumber } from '~/lib/utils'
import { BookingForm, StepKey } from './use_booking_form'
import { AspectRatio } from '../ui/aspect_ratio'
import { DEFAULT_TIMEZONE } from '~/lib/date'
import { appName } from '~/app/app'
import { Card } from '../ui/card'

interface StepReviewProps {
  form: BookingForm
  service?: Data.Services.Service
  species?: Data.Pets.Species
  location: Data.Tenants.Location
  stepKey: StepKey
  showCover?: boolean
}

export function StepReview(props: StepReviewProps) {
  const { service, species, location, form, stepKey, showCover = true } = props
  const { data } = form

  const startDateTime = data.startDate ? DateTime.fromISO(data.startDate, { zone: DEFAULT_TIMEZONE }) : null
  const formattedDate = startDateTime?.setLocale('es-MX').toFormat('EEEE, d MMMM yyyy')
  const formattedTime = startDateTime?.toFormat('hh:mma')
  const locationAddress = [location.address, location.postalCode, location.city].filter(Boolean).join(', ')

  return (
    <div className="flex flex-col gap-4">
      <Card shadow={false} className="divide-y overflow-hidden" size="lg">
        {showCover && location.coverUrl && (
          <AspectRatio ratio={1.5} className="bg-accent-faded rounded-lg overflow-hidden">
            <img src={location.coverUrl} alt="" className="size-full object-cover" />
          </AspectRatio>
        )}

        <div className="p-4">
          <div className="text-sm text-muted-foreground">Clínica</div>
          <div className="font-semibold text-lg">{location.name}</div>
          {locationAddress && (
            <div className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
              <MapPinIcon className="mt-0.5 size-4 shrink-0" />
              <span>{locationAddress}</span>
            </div>
          )}
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

      <p className="px-1 text-center text-[12px]/5 text-muted">
        ©{new Date().getFullYear()} ·{' '}
        <Link href="/" className="underline underline-offset-3 hover:text-accent">
          {appName}
        </Link>{' '}
        ·{' '}
        <Link href="/terms" className="underline underline-offset-3 hover:text-accent">
          Términos y condiciones
        </Link>{' '}
        ·{' '}
        <Link href="/privacy-policy" className="underline underline-offset-3 hover:text-accent">
          Política de privacidad
        </Link>
      </p>
    </div>
  )
}
