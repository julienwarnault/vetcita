import AppointmentStatus from '#appointment_workflow/models/appointment_status'
import { transactionContext } from '#app/shared/contexts/transaction_context'
import type { UUID } from '#app/shared/types'

interface DeleteAppointmentStatusParams {
  id: UUID
  tenantId: UUID
}

export class DeleteAppointmentStatus {
  async execute(params: DeleteAppointmentStatusParams) {
    const trx = transactionContext.get()

    const status = await AppointmentStatus.query({ client: trx })
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .where('isCustom', true)
      .firstOrFail()

    await status.delete()
  }
}
