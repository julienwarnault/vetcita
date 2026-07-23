import { cn } from 'tailwind-variants'
import { useDebounce } from 'use-debounce'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useModalStack } from '@inertiaui/modal-react'
import { SearchIcon, UserRoundPlusIcon } from 'lucide-react'
import { formatPhoneNumber } from '~/lib/utils'
import { query, urlFor } from '~/lib/tuyau'
import { Drawer } from '../ui/drawer'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Menu } from '../ui/menu'

interface PanelClientProps {
  appointmentId?: string
  selectedClientId?: string
  onChange?: (clientId: string) => void
}

export function PanelClient(props: PanelClientProps) {
  const { appointmentId, selectedClientId, onChange } = props

  const { visitModal } = useModalStack()

  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [selectionView, setSelectionView] = useState(!!selectedClientId)

  const { data, isLoading } = useQuery(query.listClients.api.queryOptions({ query: { search: debouncedSearch } }))

  const { data: client, refetch } = useQuery(
    query.getClient.api.queryOptions({ params: { id: selectedClientId! } }, { enabled: Boolean(selectedClientId) })
  )

  useEffect(() => {
    setSelectionView(!!selectedClientId)
  }, [appointmentId])

  const clients = data || []

  return (
    <Drawer.LeftPanel className={selectionView || selectedClientId ? 'min-w-[320px]' : 'min-w-44'}>
      {selectedClientId && (
        <>
          {client && (
            <Drawer.Body className="p-0">
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
                          onChange?.('')
                          setSelectionView(false)
                        }}
                      >
                        Eliminar cliente
                      </Menu.Item>
                      <Menu.Item
                        onClick={() =>
                          visitModal(urlFor('update_client.render', { id: client.id }), {
                            onClose: refetch,
                          })
                        }
                      >
                        Editar datos del cliente
                      </Menu.Item>
                    </Menu>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        visitModal(urlFor('get_client.render', { id: client.id }), {
                          onClose: refetch,
                        })
                      }}
                    >
                      Ver cliente
                    </Button>
                  </div>
                </div>

                <hr className="my-4" />
              </div>
            </Drawer.Body>
          )}
        </>
      )}
      {!selectedClientId && selectionView && (
        <>
          <Drawer.Header className="sticky top-0 px-8 pt-8 pb-4">
            <h3 className="font-semibold text-[19px]/6">Seleccionar cliente</h3>
            <div className="relative mt-6">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar cliente"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11"
              />
            </div>
          </Drawer.Header>
          <Drawer.Body className="p-0 overflow-auto h-full">
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => {
                  visitModal(urlFor('create_client.render'), {
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
                <div className="text-[15px]/5 font-semibold truncate">Añadir un nuevo cliente</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange?.('')
                  setSelectionView(false)
                }}
                className={cn(
                  'flex items-center gap-3 px-8 py-2 bg-white hover:bg-background transition-colors text-left'
                )}
              >
                <Avatar size="lg" />
                <div className="text-[15px]/5 font-semibold truncate">Sin cita</div>
              </button>
              <hr className="my-2" />
              {!isLoading &&
                clients.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => onChange?.(client.id)}
                    className={cn(
                      'flex items-center gap-3 px-8 py-2 bg-white hover:bg-background transition-colors text-left'
                    )}
                  >
                    <Avatar size="lg" fullName={client.fullName} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px]/5 font-semibold truncate">{client.fullName}</div>
                      {client.phone && <div className="text-[15px]/5 text-muted truncate">{client.phone}</div>}
                    </div>
                  </button>
                ))}
            </div>
          </Drawer.Body>
        </>
      )}
      {!selectionView && !selectionView && (
        <>
          <Drawer.Body className="p-0 h-full">
            <button
              type="button"
              className="flex flex-col gap-4 items-center justify-start py-8 h-full hover:bg-background w-full"
              onClick={() => setSelectionView(true)}
            >
              <div className="flex items-center justify-center size-12 bg-accent/10 text-accent rounded-full">
                <UserRoundPlusIcon size={20} />
              </div>
              <div className="text-[17px]/6 font-semibold">Añadir cliente</div>
            </button>
          </Drawer.Body>
        </>
      )}
    </Drawer.LeftPanel>
  )
}
