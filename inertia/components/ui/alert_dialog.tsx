import { tv } from 'tailwind-variants'
import { ComponentProps, isValidElement, ReactNode } from 'react'
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'
import { Button, ButtonVariants } from './button'

const alertDialog = tv({
  slots: {
    backdrop: 'fixed inset-0 z-400 bg-black/20',
    viewport: 'fixed inset-0 z-400 flex justify-center items-center h-full w-full',
    popup: 'relative flex flex-col bg-white shadow-xl w-full max-w-lg rounded-2xl',
    header: 'flex justify-between items-center px-12 pt-8 pb-4',
    title: 'text-[20px]/7 font-semibold',
    body: 'px-12 py-4 min-h-24',
    description: 'text-[15px]/5',
    footer: 'flex gap-3 px-12 pt-4 pb-8',
  },
})

interface AlertDialogProps {
  trigger?: ReactNode
  children: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: BaseAlertDialog.Root.Props['onOpenChange']
  className?: string
}

export function AlertDialog(props: AlertDialogProps) {
  const { trigger, children, open, defaultOpen, onOpenChange, className } = props

  const classes = alertDialog()

  return (
    <BaseAlertDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && isValidElement(trigger) && <BaseAlertDialog.Trigger render={trigger} />}

      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className={classes.backdrop()} />
        <BaseAlertDialog.Viewport className={classes.viewport()}>
          <BaseAlertDialog.Popup className={classes.popup({ className })}>{children}</BaseAlertDialog.Popup>
        </BaseAlertDialog.Viewport>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  )
}

function AlertDialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={alertDialog().header({ className })} {...props} />
}

function AlertDialogTitle({
  className,
  ...props
}: ComponentProps<typeof BaseAlertDialog.Title> & { className?: string }) {
  return <BaseAlertDialog.Title className={alertDialog().title({ className })} {...props} />
}

function AlertDialogBody({ className, ...props }: ComponentProps<'div'>) {
  return <div className={alertDialog().body({ className })} {...props} />
}

function AlertDialogDescription({
  className,
  ...props
}: ComponentProps<typeof BaseAlertDialog.Description> & { className?: string }) {
  return <BaseAlertDialog.Description className={alertDialog().description({ className })} {...props} />
}

function AlertDialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={alertDialog().footer({ className })} {...props} />
}

interface AlertDialogCancelProps extends ComponentProps<typeof BaseAlertDialog.Close> {
  children?: ReactNode
}

function AlertDialogCancel(props: AlertDialogCancelProps) {
  const { children = 'Cancelar', ...rest } = props

  return (
    <BaseAlertDialog.Close render={<Button size="lg" variant="secondary" className="w-full" />} {...rest}>
      {children}
    </BaseAlertDialog.Close>
  )
}

interface AlertDialogActionProps extends ComponentProps<typeof BaseAlertDialog.Close> {
  children?: ReactNode
  variant?: ButtonVariants['variant']
  className?: string
}

function AlertDialogAction(props: AlertDialogActionProps) {
  const { children, variant = 'destructive', className, ...rest } = props

  return (
    <BaseAlertDialog.Close render={<Button size="lg" variant={variant} className="w-full" />} {...rest}>
      {children}
    </BaseAlertDialog.Close>
  )
}

AlertDialog.Header = AlertDialogHeader
AlertDialog.Title = AlertDialogTitle
AlertDialog.Body = AlertDialogBody
AlertDialog.Description = AlertDialogDescription
AlertDialog.Footer = AlertDialogFooter
AlertDialog.Cancel = AlertDialogCancel
AlertDialog.Action = AlertDialogAction
