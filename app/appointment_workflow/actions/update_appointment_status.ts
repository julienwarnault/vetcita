import AppointmentStatus from '#appointment_workflow/models/appointment_status'
import { transactionContext } from '#shared/contexts/transaction_context'
import type { UUID } from '#shared/types'

interface UpdateAppointmentStatusParams {
  id: UUID
  name: string
  color: string
  tenantId: UUID
}

export class UpdateAppointmentStatus {
  async execute(params: UpdateAppointmentStatusParams) {
    const trx = transactionContext.get()

    const status = await AppointmentStatus.query({ client: trx })
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .where('isCustom', true)
      .firstOrFail()

    status.merge({
      name: params.name,
      color: params.color,
    })

    await status.useTransaction(trx!).save()

    return { status }
  }
}
