import { cn, tv } from 'tailwind-variants'
import { Fragment, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { useModalStack } from '@inertiaui/modal-react'
import { ChevronDownIcon, PlusIcon, XIcon } from 'lucide-react'
import { Autocomplete } from '@base-ui/react/autocomplete'
import { formatPhoneNumber } from '~/lib/utils'
import { query, urlFor } from '~/lib/tuyau'
import { baseInput } from './ui/input'
import { Card } from './ui/card'

const clientSelector = tv({
  slots: {
    group: 'relative has-[.autocomplete-clear]:[&>input]:pr-[calc(0.5rem+1.5rem*2)]',
    input: [baseInput(), 'pr-10'],
    icons: 'absolute top-1/2 right-3 flex h-full -translate-y-1/2 items-center gap-2',
    icon: 'flex items-center justify-center group-data-[popup-open]:rotate-180',
    positioner: 'z-110 outline-hidden',
    popup: 'w-[var(--anchor-width)] max-w-[var(--available-width)] max-h-[23rem]',
    item: 'flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 -mx-3 text-[15px] font-medium cursor-pointer hover:bg-background data-[selected]:bg-background data-[highlighted]:bg-background [&_svg]:size-4',
  },
})

interface ClientSelectorProps {
  defaultValue?: string
  defaultName?: string
  name?: string
  disabled?: boolean
  className?: string
}

export function ClientSelector(props: ClientSelectorProps) {
  const { className, defaultValue, defaultName, disabled, name = 'clientId' } = props

  const { visitModal } = useModalStack()
  const classes = clientSelector()

  const [label, setLabel] = useState(defaultName ?? '')
  const [value, setValue] = useState(defaultValue)
  const [search, setSearch] = useState(defaultName ?? '')
  const debouncedSearch = useDebounce(search, 300)
  const shouldSearch = Boolean(debouncedSearch && debouncedSearch !== label)

  const { data, isFetching, isEnabled } = useQuery(
    query.listClients.api.queryOptions(
      { query: { search: debouncedSearch } },
      { enabled: shouldSearch, staleTime: 5_000 }
    )
  )

  const clients = [...(data ?? []), ...(isEnabled && debouncedSearch.length > 3 ? [null] : [])]

  function selectClient(client: any) {
    setLabel(client.fullName)
    setValue(client.id)
  }

  function createClient() {
    visitModal(urlFor('create_client.render', {}, { qs: { name: debouncedSearch } }), {
      listeners: {
        onCreate(clientId: string, client?: any) {
          if (client) {
            setValue(clientId)
            setSearch(client.fullName)
          }
        },
      } as any,
    })
  }

  return (
    <div>
      <input type="hidden" name={name} value={value} />

      <Autocomplete.Root
        items={clients}
        value={search}
        onValueChange={(value) => {
          setSearch(value)
        }}
        itemToStringValue={(client) => client?.fullName || ''}
        filter={null}
        disabled={disabled}
      >
        <Autocomplete.InputGroup className={classes.group()}>
          <Autocomplete.Input
            className={classes.input()}
            name={`autocomplete_${name}`}
            placeholder="Buscar un dueño"
            disabled={disabled}
          />

          <div className={classes.icons()}>
            <Autocomplete.Clear className={cn('autocomplete-clear', classes.icon())}>
              <XIcon size={16} />
            </Autocomplete.Clear>
            <Autocomplete.Trigger className={classes.icon()}>
              <ChevronDownIcon size={16} />
            </Autocomplete.Trigger>
          </div>
        </Autocomplete.InputGroup>

        <Autocomplete.Portal>
          <Autocomplete.Positioner sideOffset={4} align="start" className={classes.positioner()}>
            <Autocomplete.Popup
              aria-busy={isFetching || undefined}
              render={<Card className={classes.popup({ className })} />}
            >
              {debouncedSearch.length === 0 && (
                <Autocomplete.Empty>
                  <div className="py-2 text-sm leading-4 text-foreground">No se han encontrado resultados</div>
                </Autocomplete.Empty>
              )}

              <Autocomplete.List>
                {(client: any | null) => {
                  if (!client)
                    return (
                      <Fragment key="add-item">
                        {search.length > 0 && (
                          <Autocomplete.Item onClick={createClient} className={classes.item()}>
                            <PlusIcon />
                            <span>Añadir "{debouncedSearch}"</span>
                          </Autocomplete.Item>
                        )}
                      </Fragment>
                    )

                  return (
                    <Autocomplete.Item
                      key={client.id}
                      value={client}
                      onClick={() => {
                        selectClient(client)
                      }}
                      className={classes.item()}
                    >
                      <div className="flex flex-col">
                        <div className="pb-1 text-[15px]/5 font-medium">{client.fullName}</div>
                        <div className="text-[13px]/4 text-muted">
                          {!!client.phone && formatPhoneNumber(client.phone)}
                        </div>
                      </div>
                    </Autocomplete.Item>
                  )
                }}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </div>
  )
}
