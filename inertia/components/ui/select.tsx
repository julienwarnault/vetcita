import { tv } from 'tailwind-variants'
import { ChevronDownIcon } from 'lucide-react'
import { isValidElement, JSX, ReactNode } from 'react'
import { Select as BaseSelect } from '@base-ui/react/select'

const select = tv({
  slots: {
    trigger: 'text-sm',
    icon: 'inline-flex data-[popup-open]:rotate-180',
    positioner: 'z-50',
    popup: 'min-w-50 rounded-xl border bg-surface px-5 py-2 shadow-xl',
    list: 'overflow-visible!',
    item: 'mx-[-0.75rem] flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium hover:bg-background data-[selected]:bg-accent-faded [&_svg]:size-4',
  },
})

interface SelectProps {
  trigger?: ReactNode
  items: { label: string; value: string; leftElement?: JSX.Element }[]
  value?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onValueChange: (value: string | null) => void
  align?: BaseSelect.Positioner.Props['align']
}

export function Select(props: SelectProps) {
  const { trigger, value, items, open, align = 'end', onOpenChange, onValueChange } = props

  const classes = select({})

  return (
    <BaseSelect.Root
      open={open}
      onOpenChange={onOpenChange}
      value={value}
      items={items}
      onValueChange={onValueChange}
    >
      {trigger && isValidElement(trigger) && (
        <BaseSelect.Trigger render={trigger} className={classes.trigger()}>
          <BaseSelect.Value />
          <BaseSelect.Icon className={classes.icon()}>
            <ChevronDownIcon size={16} />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      )}

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          side="bottom"
          sideOffset={8}
          align={align}
          alignItemWithTrigger={false}
          className={classes.positioner()}
        >
          <BaseSelect.Popup className={classes.popup()}>
            <BaseSelect.List className={classes.list()}>
              {items.map(({ leftElement: LeftElement, label, value }) => (
                <BaseSelect.Item key={value} value={value} className={classes.item()}>
                  {LeftElement}
                  <span>{label}</span>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}
