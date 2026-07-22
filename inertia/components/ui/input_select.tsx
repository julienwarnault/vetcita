import { tv } from 'tailwind-variants'
import { ChevronDownIcon } from 'lucide-react'
import { Select as BaseSelect } from '@base-ui/react/select'
import { baseInput } from './input'
import { Card } from './card'

const select = tv({
  slots: {
    trigger: [baseInput(), 'flex items-center justify-between'],
    positioner: 'z-110',
    icon: 'inline-flex items-center justify-center data-[popup-open]:rotate-180',
    popup: 'w-[var(--anchor-width)] max-h-72 overscroll-none',
    list: 'overflow-visible',
    item: 'flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 -mx-3 text-[15px]/5 font-medium cursor-pointer hover:bg-background data-[selected]:bg-background [&_svg]:size-4',
  },
})

interface InputSelectProps {
  items: { label: string; value: string }[]
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  placeholder?: string
  disabled?: boolean
}

export function InputSelect(props: InputSelectProps) {
  const { items, value, defaultValue, onValueChange, placeholder = 'Seleccionar', disabled } = props

  const classes = select({})

  return (
    <BaseSelect.Root
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <BaseSelect.Trigger className={classes.trigger()}>
        <BaseSelect.Value placeholder={placeholder} />
        <BaseSelect.Icon className={classes.icon()}>
          <ChevronDownIcon size={16} />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={4} alignItemWithTrigger={false} className={classes.positioner()}>
          <BaseSelect.Popup render={<Card shadow={true} className={classes.popup()} />}>
            <BaseSelect.List className={classes.list()}>
              {items.map((item) => (
                <BaseSelect.Item key={item.value} value={item.value} className={classes.item()}>
                  <span>{item.label}</span>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}
