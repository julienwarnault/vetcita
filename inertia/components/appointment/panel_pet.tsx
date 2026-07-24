import { cn } from 'tailwind-variants'
import { useQuery } from '@tanstack/react-query'
import { useModalStack } from '@inertiaui/modal-react'
import { formatPhoneNumber } from '~/lib/utils'
import { Breadcrumb } from '../ui/breadcrumbs'
import { query, urlFor } from '~/lib/tuyau'
import { Drawer } from '../ui/drawer'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import { Menu } from '../ui/menu'

interface PanelPetProps {
  selectedClientId?: string
  selectedPetId?: string
  onChange?: (petId: string) => void
  reset?: () => void
}

export function PanelPet(props: PanelPetProps) {
  const { selectedClientId, selectedPetId, onChange, reset } = props

  const { visitModal } = useModalStack()

  const { data, isLoading } = useQuery(
    query.listPets.api.queryOptions({ query: { clientId: selectedClientId } }, { enabled: Boolean(!selectedPetId) })
  )

  const { data: pet, refetch } = useQuery(
    query.getPet.api.queryOptions({ params: { id: selectedPetId! } }, { enabled: Boolean(selectedPetId) })
  )

  const pets = data || []

  return (
    <Drawer.LeftPanel className="min-w-[320px]">
      {selectedPetId && (
        <>
          {pet && (
            <Drawer.Body className="p-0">
              <div className="">
                <div className="flex flex-col items-center px-8 pt-8 gap-6">
                  <div className="flex flex-col items-center">
                    <Avatar size="4xl" className="mb-3" src={pet.species?.illustrationUrl} />
                    <div className="text-[17px]/6 font-semibold pb-1">{pet.name}</div>
                    <div className="text-[15px]/5 text-muted">{pet.client!.fullName}</div>
                    <div className="text-[15px]/5 text-muted">{formatPhoneNumber(pet.client!.phone)}</div>
                  </div>
                  <div className="flex gap-2">
                    <Menu
                      trigger={
                        <Button variant="secondary">
                          Acciones <Menu.TriggerIcon />
                        </Button>
                      }
                      align="start"
                    >
                      <Menu.Item onClick={() => onChange?.('')}>Cambiar de mascota</Menu.Item>
                      <Menu.Item onClick={() => reset?.()}>Cambiar de cliente</Menu.Item>
                      <Menu.Separator />
                      <Menu.Item
                        onClick={() => visitModal(urlFor('update_pet.render', { id: pet.id }), { onClose: refetch })}
                      >
                        Editar los datos de la mascota
                      </Menu.Item>
                    </Menu>
                    <Button
                      variant="secondary"
                      onClick={() => visitModal(urlFor('get_pet.render', { id: pet.id }), { onClose: refetch })}
                    >
                      Ver ficha
                    </Button>
                  </div>
                </div>

                <hr className="my-4" />
              </div>
            </Drawer.Body>
          )}
        </>
      )}
      {!selectedPetId && (
        <>
          <Drawer.Header className="sticky top-0 px-8 pt-8 pb-4 mb-2 border-none">
            <Breadcrumb>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Breadcrumb.Link render={<button onClick={reset} />}>Cliente</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Breadcrumb.Page>Mascota</Breadcrumb.Page>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb>
          </Drawer.Header>
          <Drawer.Body className="p-0 overflow-auto h-full">
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => {
                  visitModal(urlFor('create_pet.render', {}, { qs: { clientId: selectedClientId } }), {
                    listeners: {
                      onCreate(clientId: string) {
                        onChange?.(clientId)
                      },
                    } as any,
                  })
                }}
                className={cn(
                  'flex items-center gap-3 px-8 py-2 bg-white hover:bg-background transition-colors text-left'
                )}
              >
                <Avatar size="lg" icon="plus" />
                <div className="text-[15px]/5 font-semibold truncate">Añadir una nueva mascota</div>
              </button>
              <hr className="my-2" />
              {!isLoading &&
                pets.map((pet) => (
                  <button
                    key={pet.id}
                    type="button"
                    onClick={() => onChange?.(pet.id)}
                    className={cn(
                      'flex items-center gap-3 px-8 py-2 bg-white hover:bg-background transition-colors text-left'
                    )}
                  >
                    <Avatar size="lg" src={pet.species?.illustrationUrl} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px]/5 font-semibold truncate">{pet.name}</div>
                    </div>
                  </button>
                ))}
            </div>
          </Drawer.Body>
        </>
      )}
    </Drawer.LeftPanel>
  )
}
