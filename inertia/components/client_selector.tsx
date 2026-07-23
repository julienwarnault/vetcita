import { useState } from 'react'
import { cn, tv } from 'tailwind-variants'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { ChevronDownIcon, XIcon } from 'lucide-react'
import { Autocomplete } from '@base-ui/react/autocomplete'
import { formatPhoneNumber } from '~/lib/utils'
import { baseInput } from './ui/input'
import { query } from '~/lib/tuyau'
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
  className?: string
}

export function ClientSelector(props: ClientSelectorProps) {
  const { className, defaultValue, defaultName, name = 'clientId' } = props

  const classes = clientSelector()

  const [label, setLabel] = useState(defaultName ?? '')
  const [value, setValue] = useState(defaultValue)
  const [search, setSearch] = useState(defaultName ?? '')
  const debouncedSearch = useDebounce(search, 300)
  const shouldSearch = Boolean(debouncedSearch && debouncedSearch !== label)

  const { data, isFetching } = useQuery(
    query.listClients.api.queryOptions(
      { query: { search: debouncedSearch } },
      { enabled: shouldSearch, staleTime: 5_000 }
    )
  )

  const clients = data ?? []

  function selectClient(client: any) {
    setLabel(client.fullName)
    setValue(client.id)
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
        itemToStringValue={(client) => client.fullName}
        filter={null}
      >
        <Autocomplete.InputGroup className={classes.group()}>
          <Autocomplete.Input className={classes.input()} name={`autocomplete_${name}`} placeholder="Buscar un dueño" />

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
              <Autocomplete.Empty>
                <div className="py-2 text-sm leading-4 text-foreground">No se han encontrado resultados</div>
              </Autocomplete.Empty>

              <Autocomplete.List>
                {(client: any) => (
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
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </div>
  )
}
