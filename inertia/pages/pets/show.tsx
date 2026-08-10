import { Data } from '@generated/data'
import { router } from '@inertiajs/core'
import { useModalStack } from '@inertiaui/modal-react'
import { PanelAppointments } from '~/components/client/panel_appointments'
import { PanelConsultations } from '~/components/pet/panel_consultations'
import { PanelPrescriptions } from '~/components/pet/panel_prescriptions'
import { PanelVaccines } from '~/components/pet/panel_vaccines'
import { ConfirmDialog } from '~/components/ui/confirm_dialog'
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
  prescriptions: Data.MedicalRecords.Prescription[]
}>

export default function ShowPet(props: PageProps) {
  const { pet, appointments, consultations, vaccines, prescriptions } = props

  const { visitModal, closeAll } = useModalStack()

  const handleDelete = async () => {
    await ConfirmDialog.call({
      title: 'Eliminar mascota',
      mutationFn: async (call) => {
        router.delete(urlFor('delete_pet.execute', { id: pet.id }), {
          onSuccess: () => {
            call.end(true)
            closeAll()
          },
        })
      },
    })
  }

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
                            Editar
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              visitModal(urlFor('get_client.render', { id: pet.clientId }), {
                                onClose: reload,
                              })
                            }}
                          >
                            Ver cliente
                          </Menu.Item>
                          <Menu.Item variant="destructive" onClick={handleDelete}>
                            Eliminar mascota
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

                    <Tabs.List className="px-8">
                      <Tabs.Trigger value="details">Datos de la mascota</Tabs.Trigger>
                      <Tabs.Trigger value="appointments">
                        Citas
                        <Badge size="sm" variant="secondary">
                          {appointments?.length ?? 0}
                        </Badge>
                      </Tabs.Trigger>
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
                      <Tabs.Trigger value="prescriptions">
                        Prescripciones
                        <Badge size="sm" variant="secondary">
                          {prescriptions.length ?? 0}
                        </Badge>
                      </Tabs.Trigger>
                    </Tabs.List>
                  </div>
                </Drawer.Body>
              </div>
            </div>
          </Drawer.LeftPanel>

          <Tabs.Content value="details">
            <PanelDetails pet={pet} reload={reload} />
          </Tabs.Content>

          <Tabs.Content value="appointments">
            <PanelAppointments petId={pet.id} clientId={pet.clientId} appointments={appointments} reload={reload} />
          </Tabs.Content>

          <Tabs.Content value="consultations">
            <PanelConsultations petId={pet.id} consultations={consultations} reload={reload} />
          </Tabs.Content>

          <Tabs.Content value="vaccines">
            <PanelVaccines petId={pet.id} vaccines={vaccines} reload={reload} />
          </Tabs.Content>

          <Tabs.Content value="prescriptions">
            <PanelPrescriptions petId={pet.id} prescriptions={prescriptions} reload={reload} />
          </Tabs.Content>
        </Tabs>
      )}
    </InertiaDrawer>
  )
}
