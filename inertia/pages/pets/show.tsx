import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { PanelDetails as PanelClient } from '~/components/client/panel_details'
import { PanelAppointments } from '~/components/client/panel_appointments'
import { PanelConsultations } from '~/components/pet/panel_consultations'
import { PanelVaccines } from '~/components/pet/panel_vaccines'
import { PanelDetails } from '~/components/pet/panel_details'
import { InertiaDrawer } from '~/components/inertia_drawer'
import { Avatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Drawer } from '~/components/ui/drawer'
import { Badge } from '~/components/ui/badge'
import { Menu } from '~/components/ui/menu'
import { Tabs } from '~/components/ui/tabs'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  pet: Data.Pets.Pet
  appointments: Data.Booking.Appointment[]
  consultations: Data.MedicalRecords.Consultation[]
  vaccines: Data.MedicalRecords.Vaccine[]
}>

export default function ShowPet(props: PageProps) {
  const { pet, appointments, consultations, vaccines } = props

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
                        <Avatar size="4xl" className="mb-3" src={pet.species?.illustrationUrl} />
                        <div className="text-[17px]/6 font-semibold pb-1">{pet.name}</div>
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
                              visitModal(urlFor('update_pet.render', { id: pet.id }), {
                                onClose: reload,
                              })
                            }}
                          >
                            Editar datos de la mascota
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              visitModal(urlFor('create_consultation.render', { petId: pet.id }), {
                                onClose: reload,
                              })
                            }}
                          >
                            Añadir una consulta
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              visitModal(`/pets/${pet.id}/vaccines/new`, {
                                onClose: reload,
                              })
                            }}
                          >
                            Añadir una vacuna
                          </Menu.Item>
                        </Menu>
                        <Button
                          onClick={() => {
                            closeAll(true)
                            visitModal(
                              urlFor(
                                'create_appointment.render',
                                {},
                                { qs: { clientId: pet.clientId, petId: pet.id } }
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
                  <Tabs.Trigger value="details">Datos de la mascota</Tabs.Trigger>
                  <Tabs.Trigger value="appointments">
                    Citas
                    <Badge size="sm" variant="secondary">
                      {appointments?.length ?? 0}
                    </Badge>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="client">Datos del cliente</Tabs.Trigger>
                  <Tabs.Trigger value="consultations">
                    Consultas
                    <Badge size="sm" variant="secondary">
                      {consultations.length ?? 0}
                    </Badge>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="vaccines">
                    Vacunas
                    <Badge size="sm" variant="secondary">
                      {vaccines.length ?? 0}
                    </Badge>
                  </Tabs.Trigger>
                </Tabs.List>
              </Drawer.Menu>
            </div>
          </Drawer.LeftPanel>

          <Tabs.Content value="details">
            <PanelDetails pet={pet} />
          </Tabs.Content>

          <Tabs.Content value="appointments">
            <PanelAppointments appointments={appointments} />
          </Tabs.Content>

          <Tabs.Content value="client">
            <PanelClient client={pet.client!} />
          </Tabs.Content>

          <Tabs.Content value="consultations">
            <PanelConsultations consultations={consultations} />
          </Tabs.Content>

          <Tabs.Content value="vaccines">
            <PanelVaccines vaccines={vaccines} />
          </Tabs.Content>
        </Tabs>
      )}
    </InertiaDrawer>
  )
}
