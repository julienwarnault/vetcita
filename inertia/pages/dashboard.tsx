import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { InfoIcon } from 'lucide-react'
import { Link } from '@adonisjs/inertia/react'
import { AppointmentItem } from '~/components/appointment_item'
import { BarChart } from '~/components/ui/bar_chart'
import { Tooltip } from '~/components/ui/tooltip'
import { Empty } from '~/components/ui/empty'
import { Card } from '~/components/ui/card'
import { DEFAULT_LOCALE } from '~/lib/date'
import { InertiaProps } from '~/types'
import { sum } from '~/lib/utils'

type PageProps = InertiaProps<{
  stats: {
    today: number
    thisMonth: number
    noShowsThisMonth: number
    onlineThisMonth: number
  }
  topServices: {
    serviceId: string
    serviceName: string
    thisMonth: number
    lastMonth: number
  }[]
  lastUpdated: Data.Booking.Appointment[]
  todayAppointments: Data.Booking.Appointment[]
  upcoming: { date: string; active: number }[]
}>

export default function Dashboard(props: PageProps) {
  const { stats, topServices, lastUpdated, todayAppointments, upcoming } = props

  const statCards = [
    {
      label: 'Citas de hoy',
      value: stats.today,
      description: 'Número de citas durante el día en curso.',
    },
    {
      label: 'Citas de este mes',
      value: stats.thisMonth,
      description: 'Número de citas durante el mes en curso.',
    },
    {
      label: 'No presentados este mes',
      value: stats.noShowsThisMonth,
      description: 'Número de citas con el estado Inasistencia.',
    },
    {
      label: 'Reservas online este mes',
      value: stats.onlineThisMonth,
      description: 'Número de citas reservadas en línea durante el mes en curso.',
    },
  ]

  return (
    <div className="bg-background min-h-full overflow-auto">
      <div className="container-xl px-10">
        <div className="grid gap-4 pt-10 pb-24">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {statCards.map((stat) => (
              <Card key={stat.label} size="lg" className="rounded-lg bg-white">
                <div className="flex items-center gap-2">
                  <div className="text-[17px]/6 font-semibold">{stat.label}</div>
                  <Tooltip
                    trigger={
                      <button
                        type="button"
                        aria-label={stat.description}
                        className="flex size-5 shrink-0 items-center justify-center rounded-full text-border-strong hover:text-muted"
                      >
                        <InfoIcon size={18} strokeWidth={1.8} />
                      </button>
                    }
                    size="md"
                    placement="top"
                  >
                    <div className="max-w-64">{stat.description}</div>
                  </Tooltip>
                </div>
                <div className="pt-6 text-[28px]/9 font-semibold">{stat.value}</div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
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
                      illustration="calendar"
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

            <Card size="none" className="flex flex-col pt-6 rounded-lg bg-white overflow-hidden">
              <div className="pb-4 px-6">
                <h2 className="text-[20px]/7 font-semibold">Mejores servicios</h2>
              </div>
              <div className="h-100 overflow-y-auto">
                <table className="w-full table-fixed">
                  <colgroup>
                    <col />
                    <col className="w-24 sm:w-36" />
                    <col className="w-24 sm:w-36" />
                  </colgroup>
                  <thead className="border-b">
                    <tr>
                      <th className="px-2 py-4 pl-6 text-left text-[15px]/5 font-semibold">Servicio</th>
                      <th className="px-2 py-4 text-right text-[15px]/5 font-semibold">Este mes</th>
                      <th className="px-2 py-4 pr-6 text-right text-[15px]/5 font-semibold">Último mes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topServices.map((service) => (
                      <tr key={service.serviceId} className="border-b">
                        <td className="px-2 py-4 pl-6">
                          <div className="truncate text-[15px]/5">{service.serviceName}</div>
                        </td>
                        <td className="px-2 py-4 text-right text-[15px]/5">{service.thisMonth}</td>
                        <td className="px-2 py-4 pr-6 text-right text-[15px]/5">{service.lastMonth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
