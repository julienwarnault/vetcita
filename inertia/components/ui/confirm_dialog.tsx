import { ComponentProps } from 'react'
import { createCallable } from 'react-call'
import { useMutationFlow, type MutationFn } from 'react-call/mutation-flow'
import { AlertDialog } from './alert_dialog'

interface ConfirmDialogProps {
  title?: React.ReactNode
  description?: React.ReactNode
  cancelLabel?: React.ReactNode
  confirmLabel?: React.ReactNode
  variant?: ComponentProps<typeof AlertDialog.Action>['variant']
  mutationFn?: MutationFn<boolean, {}>
}

export const ConfirmDialog = createCallable<ConfirmDialogProps, boolean>(
  ({
    title = 'Eliminar',
    description = '¿Quieres continuar? Esta acción no se puede deshacer.',
    cancelLabel = 'Cancelar',
    confirmLabel = 'Eliminar',
    variant = 'destructive',
    call,
    mutationFn,
  }) => {
    const submit = useMutationFlow(call, mutationFn)

    return (
      <AlertDialog open={!call.ended}>
        <AlertDialog.Header>
          <AlertDialog.Title>{title}</AlertDialog.Title>
        </AlertDialog.Header>

        <AlertDialog.Body>
          <AlertDialog.Description>{description}</AlertDialog.Description>
        </AlertDialog.Body>

        <AlertDialog.Footer>
          <AlertDialog.Cancel onClick={() => call.end(false)}>{cancelLabel}</AlertDialog.Cancel>
          <AlertDialog.Action disabled={submit.pending} onClick={() => submit({}).orEnd(true)} variant={variant}>
            {confirmLabel}
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog>
    )
  }
)
