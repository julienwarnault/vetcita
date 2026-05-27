import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { CalendarIcon, ClockIcon, DollarSignIcon, UserIcon } from 'lucide-react'
import { BookingForm } from './use_booking_form'
import { DEFAULT_LOCALE } from '~/lib/date'
import { Card } from '../ui/card'

interface BookingDetailsProps {
  form: BookingForm
  appointmentType?: Data.AppointmentTypes.AppointmentType
}

export function BookingDetails({ form, appointmentType }: BookingDetailsProps) {
  const { data } = form

  const startDate = data.startDate ? DateTime.fromISO(data.startDate) : null
  const hasPatientInfo = data.firstName || data.lastName || data.phone

  return (
    <Card className="sticky top-24">
      <div className="flex flex-col gap-6 py-4">
        <div>
          <h2 className="font-semibold text-lg/6">Resumen</h2>
        </div>

        {appointmentType && (
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-muted">
                <CalendarIcon size={18} />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="font-medium text-base/6">{appointmentType.name}</div>
                {appointmentType.description && (
                  <div className="text-sm/5 text-muted">{appointmentType.description}</div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-muted">
                <ClockIcon size={18} />
              </div>
              <div className="text-sm/5">{appointmentType.duration} minutos</div>
            </div>

            {appointmentType.price && (
              <div className="flex items-center gap-3">
                <div className="text-muted">
                  <DollarSignIcon size={18} />
                </div>
                <div className="text-sm/5">${appointmentType.price}</div>
              </div>
            )}
          </div>
        )}

        {startDate && (
          <div className="flex flex-col gap-1 pt-4 border-t">
            <div className="text-sm/5 text-muted">Fecha y hora</div>
            <div className="font-medium text-base/6">
              {startDate.setLocale(DEFAULT_LOCALE).toFormat("EEEE d 'de' MMMM")}
            </div>
            <div className="text-base/6">{startDate.toFormat('HH:mm')}</div>
          </div>
        )}

        {hasPatientInfo && (
          <div className="flex flex-col gap-3 pt-4 border-t">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-muted">
                <UserIcon size={18} />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                {(data.firstName || data.lastName) && (
                  <div className="font-medium text-base/6">
                    {data.firstName} {data.lastName}
                  </div>
                )}
                {data.phone && <div className="text-sm/5 text-muted">{data.phone}</div>}
                {data.email && <div className="text-sm/5 text-muted">{data.email}</div>}
              </div>
            </div>
          </div>
        )}

        {!appointmentType && !startDate && !hasPatientInfo && (
          <div className="text-sm/5 text-muted py-4">Selecciona un tipo de cita para comenzar</div>
        )}
      </div>
    </Card>
  )
}
