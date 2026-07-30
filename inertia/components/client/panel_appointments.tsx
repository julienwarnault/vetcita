import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { formatDuration } from '~/lib/utils'
import { DEFAULT_LOCALE } from '~/lib/date'
import { Drawer } from '../ui/drawer'
import { urlFor } from '~/lib/tuyau'
import { Badge } from '../ui/badge'
import { Empty } from '../ui/empty'
import { Card } from '../ui/card'

interface PanelAppointmentsProps {
  appointments: Data.Booking.Appointment[]
  reload: () => void
}

export function PanelAppointments(props: PanelAppointmentsProps) {
  const { appointments, reload } = props

  const { visitModal } = useModalStack()

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr]">
      <Drawer.Header className="bg-background border-none px-8 pt-8">
        <h1 className="text-[28px]/9 font-semibold">Citas</h1>
      </Drawer.Header>
      <Drawer.Body className="bg-background">
        <div className="flex flex-col gap-2 w-full">
          {appointments.map((appointment) => {
            const startDate = DateTime.fromISO(appointment.localStartDate!)

            return (
              <Card
                key={appointment.id}
                size="lg"
                className="flex flex-col gap-4 cursor-pointer hover:border-border-strong"
                onClick={() => {
                  visitModal(urlFor('update_appointment.render', { id: appointment.id }), {
                    onClose: reload,
                  })
                }}
              >
                <div>
                  <div className="flex justify-between">
                    <div className="text-[17px]/6 font-semibold">Cita</div>
                    <Badge color={appointment.status?.color}>{appointment.status?.name}</Badge>
                  </div>
                  <div className="text-[13px]/4 font-normal text-muted">
                    {startDate.setLocale(DEFAULT_LOCALE).toFormat('ccc. d LLL yyyy')}
                  </div>
                </div>
                <div>
                  <div className="text-[15px]/5 font-medium">{appointment.service?.name}</div>
                  <div className="flex text-[13px]/4 font-normal text-muted separator-dot">
                    <span>{startDate.toFormat('h:mma').toLowerCase()}</span>
                    <span>{formatDuration(appointment.duration)}</span>
                    <span>{appointment.agenda?.name}</span>
                  </div>
                </div>
              </Card>
            )
          })}
          {appointments.length == 0 && (
            <Empty
              heading="No hay citas"
              description="No se han creado citas para este cliente"
              illustration="/illustrations/calendar.png"
              border={true}
            />
          )}
        </div>
      </Drawer.Body>
    </Drawer.MainPanel>
  )
}
