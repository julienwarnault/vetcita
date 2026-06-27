import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { AppointmentItem } from '~/components/appointment_item'
import { BarChart } from '~/components/ui/bar_chart'
import { Card } from '~/components/ui/card'
import { DEFAULT_LOCALE } from '~/lib/date'
import { InertiaProps } from '~/types'
import { sum } from '~/lib/utils'
import { Empty } from '~/components/ui/empty'
import { Link } from '@adonisjs/inertia/react'

type PageProps = InertiaProps<{
  lastUpdated: Data.Booking.Appointment[]
  todayAppointments: Data.Booking.Appointment[]
  upcoming: { date: string; active: number }[]
}>

export default function Dashboard(props: PageProps) {
  const { lastUpdated, todayAppointments, upcoming } = props

  return (
    <div className="bg-background min-h-full overflow-auto">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-8 pb-24">
          <Card size="lg" className="flex flex-col rounded-lg bg-white overflow-hidden">
            <div className="pb-4">
              <h2 className="text-[20px]/7 font-semibold">Próximas citas</h2>
              <div className="text-[15px]/5 text-muted">Próximos 7 días</div>
            </div>
            <div className="pb-9">
              <div className="text-[28px]/9 font-semibold">{sum(upcoming.map((apt) => apt.active))} Cita(s)</div>
            </div>
            <div className="h-75">
              <BarChart
                data={upcoming.map((u) => ({
                  label: DateTime.fromISO(u.date).setLocale(DEFAULT_LOCALE).toFormat('ccc d'),
                  value: u.active,
                }))}
                dataKey="value"
                tooltipContent={(item) => (
                  <div className="bg-primary text-white rounded-md px-3 py-2 text-[13px]/4 min-w-25">
                    <div className="text-muted-foreground">{item.label}</div>
                    <div className="font-semibold pt-1">{item.value} cita(s)</div>
                  </div>
                )}
              />
            </div>
          </Card>

          <Card size="none" className="flex flex-col pt-6 rounded-lg bg-white overflow-hidden">
            <div className="pb-4 px-6">
              <h2 className="text-[20px]/7 font-semibold">Próximas citas de hoy</h2>
            </div>
            <div className="h-100">
              <div className="flex flex-col overflow-y-auto h-full">
                {todayAppointments.map((appointment) => (
                  <AppointmentItem key={appointment.id} appointment={appointment} />
                ))}
                {todayAppointments.length == 0 && (
                  <Empty
                    icon="calendar-clock"
                    heading="No hay citas hoy"
                    description={
                      <div>
                        Visita la sección{' '}
                        <Link route="show_calendar.render" className="text-accent">
                          Calendario
                        </Link>{' '}
                        para añadir algunas citas
                      </div>
                    }
                    border={false}
                  />
                )}
              </div>
            </div>
          </Card>

          <Card size="none" className="flex flex-col pt-6 rounded-lg bg-white overflow-hidden">
            <div className="pb-4 px-6">
              <h2 className="text-[20px]/7 font-semibold">Actividad de citas</h2>
            </div>
            <div className="h-100">
              <div className="flex flex-col overflow-y-auto h-full">
                {lastUpdated.map((appointment) => (
                  <AppointmentItem key={appointment.id} appointment={appointment} />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
