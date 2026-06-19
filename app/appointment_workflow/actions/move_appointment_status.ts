import AppointmentStatus from '#appointment_workflow/models/appointment_status'
import { transactionContext } from '#app/shared/contexts/transaction_context'
import type { UUID } from '#app/shared/types'

const START_OFFSET = 1

interface MoveAppointmentStatusParams {
  id: UUID
  direction: 'up' | 'down'
  tenantId: UUID
}

export class MoveAppointmentStatus {
  async execute(params: MoveAppointmentStatusParams) {
    const trx = transactionContext.get()

    const customStatuses = await AppointmentStatus.query({ client: trx })
      .where('tenantId', params.tenantId)
      .where('isCustom', true)
      .orderBy('sortOrder', 'asc')

    const index = customStatuses.findIndex((cs) => cs.id === params.id)

    if (index === -1) {
      throw new Error('Appointment status not found')
    }

    const targetIndex = params.direction === 'up' ? index - 1 : index + 1

    if (targetIndex >= 0 && targetIndex < customStatuses.length) {
      ;[customStatuses[index], customStatuses[targetIndex]] = [customStatuses[targetIndex], customStatuses[index]]
    }

    for (const [i, customStatus] of customStatuses.entries()) {
      customStatus.merge({ sortOrder: START_OFFSET + i + 1 })
      await customStatus.useTransaction(trx!).save()
    }

    return
  }
}
