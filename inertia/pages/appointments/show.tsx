import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { capitalize, formatPhoneNumber } from '~/lib/utils'
import { InertiaDrawer } from '~/components/inertia_drawer'
import { Avatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Drawer } from '~/components/ui/drawer'
import { DEFAULT_LOCALE } from '~/lib/date'
import { Menu } from '~/components/ui/menu'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  appointment: Data.Booking.Appointment
}>

export default function ShowAppointment(props: PageProps) {
  const { appointment } = props
  const { patient, appointmentType } = appointment

  const { visitModal } = useModalStack()

  const startDate = DateTime.fromISO(appointment.localStartDate!)
  const endDate = DateTime.fromISO(appointment.localEndDate!)

  return (
    <InertiaDrawer>
      {({ reload }) => (
        <>
          <Drawer.LeftPanel className={patient ? 'min-w-[320px]' : 'min-w-40'}>
            <Drawer.Body className="p-0">
              {patient && (
                <div className="">
                  <div className="flex flex-col items-center px-8 pt-8 gap-6">
                    <div className="flex flex-col items-center">
                      <Avatar size="4xl" className="mb-3" fullName={patient.fullName} />
                      <div className="text-[17px]/6 font-medium pb-1">{patient.fullName}</div>
                      {patient.email && (
                        <div className="text-[15px]/5 text-muted">{patient.email}</div>
                      )}
                      <div className="text-[15px]/5 text-muted">
                        {formatPhoneNumber(patient.phone)}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Menu
                        trigger={
                          <Button variant="secondary">
                            Acciones <Menu.TriggerIcon />
                          </Button>
                        }
                        align="start"
                      >
                        <Menu.Item
                          onClick={() =>
                            visitModal(urlFor('update_patient.render', { id: patient.id }), {
                              onClose: reload,
                            })
                          }
                        >
                          Editar datos del paciente
                        </Menu.Item>
                      </Menu>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          visitModal(urlFor('get_patient.render', { id: patient.id }), {
                            onClose: reload,
                          })
                        }}
                      >
                        Ver paciente
                      </Button>
                    </div>
                  </div>

                  <hr className="my-4" />
                </div>
              )}
            </Drawer.Body>
          </Drawer.LeftPanel>

          <Drawer.MainPanel className="grid grid-rows-[auto_1fr_auto]">
            <Drawer.Header>
              <div className="flex justify-between gap-4 p-8 bg-[#208901]">
                <div className="flex flex-col">
                  <h1 className="text-[28px]/9 font-semibold text-white">
                    {capitalize(startDate.setLocale(DEFAULT_LOCALE).toFormat('ccc. d LLL'))}
                  </h1>

                  <div className="text-sm font-normal text-white">
                    {startDate.toFormat('h:mma').toLowerCase()} • {appointment.bookingRef}
                  </div>
                </div>
                <div>
                  <Button variant="secondary" className="text-white border-white bg-transparent">
                    Reservada
                  </Button>
                </div>
              </div>
            </Drawer.Header>
            <Drawer.Body>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Examen</h2>
                <div className="flex items-center gap-4">
                  <div
                    className="w-1 h-auto rounded-full self-stretch shrink-0"
                    style={{ backgroundColor: appointmentType!.color }}
                  />
                  <div className="flex flex-col gap-1 py-2">
                    <div className="text-[17px]/6 font-medium">{appointmentType!.name}</div>

                    <div className="text-[15px]/5 text-foreground">
                      {`${startDate.toFormat('h:mma')} - ${endDate.toFormat('h:mma')}`.toLowerCase()}
                    </div>
                  </div>
                </div>
              </div>
            </Drawer.Body>
            <Drawer.Footer></Drawer.Footer>
          </Drawer.MainPanel>
        </>
      )}
    </InertiaDrawer>
  )
}
