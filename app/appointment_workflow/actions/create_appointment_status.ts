import AppointmentStatus from '#appointment_workflow/models/appointment_status'
import { transactionContext } from '#shared/contexts/transaction_context'
import type { UUID } from '#shared/types'

const START_OFFSET = 1

interface CreateAppointmentStatusParams {
  name: string
  color: string
  icon: string
  tenantId: UUID
}

export class CreateAppointmentStatus {
  async execute(params: CreateAppointmentStatusParams) {
    const trx = transactionContext.get()

    const lastCustomStatus = await AppointmentStatus.query({ client: trx })
      .where('tenantId', params.tenantId)
      .where('isCustom', true)
      .orderBy('sortOrder', 'desc')
      .first()

    const maxSortOrder = lastCustomStatus?.sortOrder ?? START_OFFSET
    const nextSortOrder = Math.min(maxSortOrder + 1, 99)

    const status = await AppointmentStatus.create(
      {
        name: params.name,
        color: params.color,
        icon: params.icon,
        sortOrder: nextSortOrder,
        isCustom: true,
        tenantId: params.tenantId,
      },
      { client: trx }
    )

    return { status }
  }
}
