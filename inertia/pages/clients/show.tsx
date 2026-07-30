import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { PanelAppointments } from '~/components/client/panel_appointments'
import { PanelDetails } from '~/components/client/panel_details'
import { InertiaDrawer } from '~/components/inertia_drawer'
import { PanelPets } from '~/components/client/panel_pets'
import { Avatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Drawer } from '~/components/ui/drawer'
import { formatPhoneNumber } from '~/lib/utils'
import { Badge } from '~/components/ui/badge'
import { Menu } from '~/components/ui/menu'
import { Tabs } from '~/components/ui/tabs'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  client: Data.Clients.Client
  appointments: Data.Booking.Appointment[]
  pets: Data.Pets.Pet[]
}>

export default function ShowClient(props: PageProps) {
  const { client, appointments, pets } = props

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
                        <Avatar size="4xl" className="mb-3" fullName={client.fullName} />
                        <div className="text-[17px]/6 font-semibold pb-1">{client.fullName}</div>
                        {client.email && <div className="text-[15px]/5 text-muted">{client.email}</div>}
                        <div className="text-[15px]/5 text-muted">{formatPhoneNumber(client.phone)}</div>
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
                              visitModal(urlFor('update_client.render', { id: client.id }), {
                                onClose: reload,
                              })
                            }}
                          >
                            Editar datos del cliente
                          </Menu.Item>
                        </Menu>
                        <Button
                          onClick={() => {
                            closeAll(true)
                            visitModal(urlFor('create_appointment.render', {}, { qs: { clientId: client.id } }), {
                              onClose: reload,
                            })
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
                  <Tabs.Trigger value="details">Datos del cliente</Tabs.Trigger>
                  <Tabs.Trigger value="appointments">
                    Citas
                    <Badge size="sm" variant="secondary">
                      {appointments?.length ?? 0}
                    </Badge>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="pets">
                    Mascotas
                    <Badge size="sm" variant="secondary">
                      {pets?.length ?? 0}
                    </Badge>
                  </Tabs.Trigger>
                </Tabs.List>
              </Drawer.Menu>
            </div>
          </Drawer.LeftPanel>

          <Tabs.Content value="details">
            <PanelDetails client={client} />
          </Tabs.Content>

          <Tabs.Content value="appointments">
            <PanelAppointments appointments={appointments} />
          </Tabs.Content>

          <Tabs.Content value="pets">
            <PanelPets pets={pets} />
          </Tabs.Content>
        </Tabs>
      )}
    </InertiaDrawer>
  )
}
