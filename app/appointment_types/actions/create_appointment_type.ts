import { transactionContext } from '#app/shared/contexts/transaction_context'
import AppointmentType from '#appointment_types/models/appointment_type'
import type { UUID } from '#app/shared/types'

interface CreateAppointmentTypeParams {
  name: string
  color: string
  duration: number
  price?: number
  description?: string
  tenantId: UUID
}

export class CreateAppointmentType {
  async execute(params: CreateAppointmentTypeParams) {
    const trx = transactionContext.get()

    const appointmentType = await AppointmentType.create(
      {
        name: params.name,
        color: params.color,
        duration: params.duration,
        price: params.price,
        description: params.description,
        tenantId: params.tenantId,
      },
      { client: trx }
    )

    return { appointmentType }
  }
}
