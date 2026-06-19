import { tv } from 'tailwind-variants'
import { ChevronDownIcon } from 'lucide-react'
import { isValidElement, ReactNode } from 'react'
import { Popover as BasePopover } from '@base-ui/react/popover'
import { Card } from './card'

const popover = tv({
  slots: {
    positioner: 'z-50',
    popup: 'max-h-[var(--available-height)] overscroll-none',
    icon: 'group-data-[popup-open]:rotate-180',
  },
})

interface PopoverProps {
  trigger?: ReactNode
  className?: string
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  align?: BasePopover.Positioner.Props['align']
  alignOffset?: BasePopover.Positioner.Props['alignOffset']
  sideOffset?: BasePopover.Positioner.Props['sideOffset']
}

export function Popover(props: PopoverProps) {
  const { trigger, className, children, open, onOpenChange, align = 'center', alignOffset, sideOffset = 8 } = props

  const classes = popover({})

  return (
    <BasePopover.Root open={open} onOpenChange={onOpenChange}>
      {trigger && isValidElement(trigger) && <BasePopover.Trigger render={trigger} />}

      <BasePopover.Portal>
        <BasePopover.Positioner
          side="bottom"
          align={align}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
          className={classes.positioner()}
          collisionAvoidance={{ side: 'none' }}
        >
          <BasePopover.Popup render={<Card shadow={true} className={classes.popup({ className })} />}>
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  )
}

function PopoverTriggerIcon() {
  return <ChevronDownIcon className={popover().icon()} size={16} />
}

Popover.TriggerIcon = PopoverTriggerIcon
