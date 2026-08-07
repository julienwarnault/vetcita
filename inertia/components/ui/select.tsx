import { cn, tv } from 'tailwind-variants'
import { isValidElement, JSX, ReactNode } from 'react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { Select as BaseSelect } from '@base-ui/react/select'

const select = tv({
  slots: {
    trigger: 'text-sm',
    icon: 'inline-flex group-data-[popup-open]:rotate-180',
    positioner: 'z-200',
    popup: 'min-w-50 rounded-xl border bg-surface px-5 py-2 shadow-xl max-h-72 overflow-auto overscroll-none',
    list: 'overflow-visible!',
    item: 'mx-[-0.75rem] flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-[15px] font-medium hover:bg-background [&_svg]:size-4',
    itemContent: 'flex items-center gap-2 grow',
  },
})

interface SelectProps {
  trigger?: ReactNode
  items: {
    label: string
    value: string
    leftElement?: JSX.Element
    rightElement?: JSX.Element
    variant?: 'destructive'
  }[]
  value?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onValueChange?: (value: string | null) => void
  align?: BaseSelect.Positioner.Props['align']
  sideOffset?: BaseSelect.Positioner.Props['sideOffset']
  className?: string
}

export function Select(props: SelectProps) {
  const { trigger, value, items, open, align = 'end', sideOffset = 8, className, onOpenChange, onValueChange } = props

  const classes = select({})

  return (
    <BaseSelect.Root open={open} onOpenChange={onOpenChange} value={value} items={items} onValueChange={onValueChange}>
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
          sideOffset={sideOffset}
          align={align}
          alignItemWithTrigger={false}
          className={classes.positioner()}
        >
          <BaseSelect.Popup className={classes.popup({ className })}>
            <BaseSelect.List className={classes.list()}>
              {items.map(({ leftElement: LeftElement, rightElement: RightElement, label, value, variant }) => (
                <BaseSelect.Item
                  key={value}
                  value={value}
                  className={cn(classes.item(), variant === 'destructive' && 'text-destructive')}
                >
                  <div className={classes.itemContent()}>
                    {LeftElement}
                    <span className="grow">{label}</span>
                    {RightElement}
                  </div>
                  <BaseSelect.ItemIndicator>
                    <CheckIcon className="size-5!" />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  )
}

function SelectTriggerIcon() {
  return <ChevronDownIcon className={select().icon()} size={16} />
}

Select.TriggerIcon = SelectTriggerIcon
