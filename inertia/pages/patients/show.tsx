import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { InertiaDrawer } from '~/components/inertia_drawer'
import { Avatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Drawer } from '~/components/ui/drawer'
import { formatPhoneNumber } from '~/lib/utils'
import { Menu } from '~/components/ui/menu'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  patient: Data.Patients.Patient
}>

export default function ShowPatient(props: PageProps) {
  const { patient } = props

  const { visitModal } = useModalStack()

  return (
    <InertiaDrawer>
      {({ reload }) => (
        <>
          <Drawer.LeftPanel>
            <div className="flex flex-row h-full">
              <div>
                <Drawer.Body className="p-0 h-full">
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
                        <Button disabled>Reservar ahora</Button>
                      </div>
                    </div>

                    <hr className="my-4" />
                  </div>
                </Drawer.Body>
              </div>
              <div className="h-full w-54">
                <Drawer.Body className="border-l-12 px-6 py-8 h-full"></Drawer.Body>
              </div>
            </div>
          </Drawer.LeftPanel>

          <Drawer.MainPanel></Drawer.MainPanel>
        </>
      )}
    </InertiaDrawer>
  )
}
