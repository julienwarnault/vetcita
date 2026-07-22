import { ChevronDownIcon, XIcon } from 'lucide-react'
import { cn, tv, VariantProps } from 'tailwind-variants'
import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { baseInput } from './input'
import { Card } from './card'

const combobox = tv({
  slots: {
    group: 'group relative has-[.combobox-clear]:[&>input]:pr-[calc(0.5rem+1.5rem*2)]',
    input: [baseInput(), 'pr-10'],
    icons: 'absolute top-1/2 right-3 flex h-full -translate-y-1/2 items-center gap-2',
    icon: 'flex items-center justify-center group-data-[popup-open]:rotate-180',
    positioner: 'z-110',
    popup: 'w-[var(--anchor-width)] max-h-72',
    item: 'flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 -mx-3 text-[15px]/5 font-medium cursor-pointer hover:bg-background data-[selected]:bg-background [&_svg]:size-4',
  },
})

type ComboboxVariants = VariantProps<typeof combobox>

interface ComboboxFieldProps extends ComboboxVariants {
  items: { label: string; value: string }[]
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  placeholder?: string
  disabled?: boolean
}

export function Combobox(props: ComboboxFieldProps) {
  const { items, value, defaultValue, onValueChange, placeholder = 'Seleccionar', disabled } = props

  const classes = combobox()

  return (
    <BaseCombobox.Root
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <BaseCombobox.InputGroup className={classes.group()}>
        <BaseCombobox.Input placeholder={placeholder} className={classes.input()} />

        <div className={classes.icons()}>
          <BaseCombobox.Clear className={cn('combobox-clear', classes.icon())}>
            <XIcon size={16} />
          </BaseCombobox.Clear>
          <BaseCombobox.Trigger>
            <ChevronDownIcon size={16} />
          </BaseCombobox.Trigger>
        </div>
      </BaseCombobox.InputGroup>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner sideOffset={4} className={classes.positioner()}>
          <BaseCombobox.Popup render={<Card className={classes.popup()} />}>
            <BaseCombobox.Empty>
              <div className="py-2 text-sm leading-4 text-foreground">No se han encontrado resultados</div>
            </BaseCombobox.Empty>

            <BaseCombobox.List>
              {(item: { label: string; value: string }) => (
                <BaseCombobox.Item key={item.value} value={item} className={classes.item()}>
                  <span>{item.label}</span>
                </BaseCombobox.Item>
              )}
            </BaseCombobox.List>
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  )
}
