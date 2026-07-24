import { cn, tv } from 'tailwind-variants'
import { ChevronDownIcon } from 'lucide-react'
import { Menu as BaseMenu } from '@base-ui/react/menu'
import { ComponentProps, isValidElement, ReactNode } from 'react'

const menu = tv({
  slots: {
    icon: 'group-data-[popup-open]:rotate-180',
    positioner: 'z-200',
    popup: 'min-w-50 rounded-xl border bg-surface px-5 py-2 shadow-xl',
    item: 'mx-[-0.75rem] flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium hover:bg-background data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4',
  },
  variants: {
    variant: {
      destructive: {
        item: 'text-destructive',
      },
    },
  },
})

interface MenuProps {
  trigger?: ReactNode
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  align?: BaseMenu.Positioner.Props['align']
}

export function Menu(props: MenuProps) {
  const { trigger, align = 'end', children, open, onOpenChange } = props

  const classes = menu()

  return (
    <BaseMenu.Root open={open} onOpenChange={onOpenChange}>
      {trigger && isValidElement(trigger) && <BaseMenu.Trigger render={trigger} />}

      <BaseMenu.Portal>
        <BaseMenu.Positioner side="bottom" align={align} sideOffset={8} className={classes.positioner()}>
          <BaseMenu.Popup className={classes.popup()}>{children}</BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  )
}

interface MenuItemProps extends ComponentProps<typeof BaseMenu.Item> {
  className?: string
  variant?: 'destructive'
}

function MenuItem(props: MenuItemProps) {
  const { className, variant, ...rest } = props

  return <BaseMenu.Item className={menu({ variant }).item({ className })} {...rest} />
}

function MenuTriggerIcon() {
  return <ChevronDownIcon className={menu().icon()} size={16} />
}

function MenuSeparator({ className }: { className?: string }) {
  return <hr className={cn('my-2', className)} />
}

Menu.Item = MenuItem
Menu.TriggerIcon = MenuTriggerIcon
Menu.Separator = MenuSeparator
