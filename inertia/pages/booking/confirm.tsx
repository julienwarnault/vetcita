import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { CalendarSyncIcon, CalendarXIcon, CheckCircleIcon, ChevronRightIcon } from 'lucide-react'
import { capitalize, formatDuration } from '~/lib/utils'
import { FormHeader } from '~/components/form_header'
import { DEFAULT_TIMEZONE } from '~/lib/date'
import MinimalLayout from '~/layouts/minimal'
import { Badge } from '~/components/ui/badge'
import { Card } from '~/components/ui/card'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  appointment: Data.Booking.Appointment
}>

export default function Confirm(props: PageProps) {
  const { appointment } = props
  const { appointmentType } = appointment

  const startDateTime = DateTime.fromISO(appointment.startDate!.toString(), {
    zone: DEFAULT_TIMEZONE,
  })
  const formattedDate = startDateTime?.setLocale('es-MX').toFormat("cccc, dd LLLL yyyy 'a las' h:mma")

  return (
    <>
      <FormHeader title="" className="border-b" />

      <div className="flex-1 bg-background">
        <div className="mx-auto max-w-140 w-full-sm py-12 px-8">
          <Card shadow={false} className="p-0">
            <div className="flex flex-col gap-4 p-8 px-4">
              <div className="flex flex-col gap-4">
                <div>
                  <Badge size="lg" variant="accent">
                    <CheckCircleIcon />
                    Confirmada
                  </Badge>
                </div>
                <h1 className="text-[28px]/9 font-bold">{capitalize(formattedDate)}</h1>
                <div className="text-muted text-[14px]/4 font-normal">N°{appointment.bookingRef}</div>
              </div>

              <hr />

              <div>
                <div className="font-semibold text-[19px]/6">Resumen</div>
                <div className="flex justify-between items-center pt-4">
                  <div>
                    <div className="text-[16px]">{appointmentType?.name}</div>
                    <div className="text-sm/5 text-muted">{formatDuration(appointment?.duration)}</div>
                  </div>
                  {appointmentType?.price && (
                    <div className="text-[16px] font-semibold">{appointmentType?.price} MXN</div>
                  )}
                </div>
              </div>

              <hr />

              <div>
                <div className="flex items-center justify-between py-3 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <CalendarSyncIcon size={22} strokeWidth={1.8} />
                    <div className="text-base/6 font-medium">Cambiar cita</div>
                  </div>
                  <ChevronRightIcon size={20} className="text-border-strong" />
                </div>
                <div className="flex items-center justify-between py-3 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <CalendarXIcon size={22} strokeWidth={1.8} />
                    <div className="text-base/6 font-medium">Cancelar cita</div>
                  </div>
                  <ChevronRightIcon size={20} className="text-border-strong" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

Confirm.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
