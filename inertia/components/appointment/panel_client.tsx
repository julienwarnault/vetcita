import { useState } from 'react'
import { cn } from 'tailwind-variants'
import { SearchIcon } from 'lucide-react'
import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import { useModalStack } from '@inertiaui/modal-react'
import { query, urlFor } from '~/lib/tuyau'
import { Drawer } from '../ui/drawer'
import { Avatar } from '../ui/avatar'
import { Input } from '../ui/input'

interface PanelClientProps {
  selectedClientId?: string
  onChange?: (clientId: string) => void
}

export function PanelClient(props: PanelClientProps) {
  const { selectedClientId, onChange } = props

  const { visitModal } = useModalStack()

  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)

  const { data, isLoading } = useQuery(
    query.listClients.api.queryOptions({ query: { search: debouncedSearch } }, { enabled: Boolean(!selectedClientId) })
  )

  const clients = data || []

  return (
    <Drawer.LeftPanel className="min-w-[320px]">
      {!selectedClientId && (
        <>
          <Drawer.Header className="sticky top-0 px-8 pt-8 pb-4 mb-2">
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
                    <Avatar size="lg" color={client.color} fullName={client.fullName} />
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
    </Drawer.LeftPanel>
  )
}
