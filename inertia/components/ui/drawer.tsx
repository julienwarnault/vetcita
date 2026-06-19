import { XIcon } from 'lucide-react'
import { cn } from 'tailwind-variants'
import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { ComponentProps, isValidElement, ReactNode } from 'react'
import { Button } from './button'

interface DrawerProps {
  trigger?: ReactNode
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Drawer(props: DrawerProps) {
  const { trigger, children, open, onOpenChange } = props

  return (
    <BaseDrawer.Root
      modal={false}
      open={open}
      onOpenChange={onOpenChange}
      swipeDirection="right"
      disablePointerDismissal
    >
      {trigger && isValidElement(trigger) && <BaseDrawer.Trigger render={trigger} />}

      <BaseDrawer.Portal>
        <BaseDrawer.Viewport className="fixed inset-0 flex items-stretch justify-end z-100 pointer-events-none">
          <BaseDrawer.Popup
            className={cn(
              'pointer-events-auto h-full focus-visible:outline-none',
              'transition-transform duration-300 ease-out',
              'data-starting-style:translate-x-full data-closed:translate-x-full data-open:translate-x-0'
            )}
          >
            <BaseDrawer.Content className="flex flex-row w-full h-full">
              <div className="flex items-start p-3">
                <BaseDrawer.Close render={<Button variant="secondary" size="icon-lg" className="shadow-lg" />}>
                  <XIcon />
                </BaseDrawer.Close>
              </div>
              <div className="flex flex-row flex-1 bg-white border-l shadow-lg">{children}</div>
            </BaseDrawer.Content>
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  )
}

function LeftPanel({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('w-full h-full min-w-[320px] border-r duration-300', className)} {...props} />
}

function MainPanel({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('h-full min-w-120 w-120 overflow-y-auto overflow-x-hidden', className)} {...props} />
}

function DrawerHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('sticky z-10 bg-surface top-0 border-b', className)} {...props} />
}

function DrawerBody({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('px-8 py-8', className)} {...props} />
}

function DrawerFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('px-8 py-4 sticky z-10 bg-surface bottom-0 border-t', className)} {...props} />
}

function DrawerMenu({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('h-full w-54 border-l-12 px-6 py-8', className)} {...props} />
}

Drawer.LeftPanel = LeftPanel
Drawer.MainPanel = MainPanel
Drawer.Header = DrawerHeader
Drawer.Body = DrawerBody
Drawer.Footer = DrawerFooter
Drawer.Menu = DrawerMenu
