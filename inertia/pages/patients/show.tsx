import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { PanelAppointments } from '~/components/patient/panel_appointments'
import { PanelDetails } from '~/components/patient/panel_details'
import { InertiaDrawer } from '~/components/inertia_drawer'
import { Avatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Drawer } from '~/components/ui/drawer'
import { formatPhoneNumber } from '~/lib/utils'
import { Menu } from '~/components/ui/menu'
import { Tabs } from '~/components/ui/tabs'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  patient: Data.Patients.Patient
  appointments: Data.Booking.Appointment[]
}>

export default function ShowPatient(props: PageProps) {
  const { patient, appointments } = props

  const { visitModal, closeAll } = useModalStack()

  return (
    <InertiaDrawer>
      {({ reload }) => (
        <Tabs className="flex flex-row" defaultValue="details" orientation="vertical">
          <Drawer.LeftPanel>
            <div className="flex flex-row h-full">
              <div>
                <Drawer.Body className="p-0 h-full">
                  <div className="">
                    <div className="flex flex-col items-center px-8 pt-8 gap-6">
                      <div className="flex flex-col items-center">
                        <Avatar size="4xl" className="mb-3" fullName={patient.fullName} />
                        <div className="text-[17px]/6 font-semibold pb-1">{patient.fullName}</div>
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
                            onClick={() => {
                              visitModal(urlFor('update_patient.render', { id: patient.id }), {
                                onClose: reload,
                              })
                            }}
                          >
                            Editar datos del paciente
                          </Menu.Item>
                        </Menu>
                        <Button
                          onClick={() => {
                            closeAll(true)
                            visitModal(
                              urlFor(
                                'create_appointment.render',
                                {},
                                { qs: { patientId: patient.id } }
                              ),
                              {
                                onClose: reload,
                              }
                            )
                          }}
                        >
                          Reservar ahora
                        </Button>
                      </div>
                    </div>

                    <hr className="my-4" />
                  </div>
                </Drawer.Body>
              </div>
              <Drawer.Menu>
                <Tabs.List>
                  <Tabs.Trigger value="details">Datos del paciente</Tabs.Trigger>
                  <Tabs.Trigger value="appointments">
                    Citas
                    <div className="flex items-center justify-center bg-white h-5 px-1.5 rounded-full border">
                      <span className="text-[13px]/4 text-muted font-medium">
                        {appointments?.length ?? 0}
                      </span>
                    </div>
                  </Tabs.Trigger>
                </Tabs.List>
              </Drawer.Menu>
            </div>
          </Drawer.LeftPanel>

          <Tabs.Content value="details">
            <PanelDetails patient={patient} />
          </Tabs.Content>

          <Tabs.Content value="appointments">
            <PanelAppointments appointments={appointments} />
          </Tabs.Content>
        </Tabs>
      )}
    </InertiaDrawer>
  )
}
