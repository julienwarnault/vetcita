import { transactionContext } from '#app/shared/contexts/transaction_context'
import AppointmentType from '#appointment_types/models/appointment_type'
import type { UUID } from '#app/shared/types'

interface UpdateAppointmentTypeParams {
  id: UUID
  name: string
  color: string
  duration: number
  price?: number
  description?: string
}

export class UpdateAppointmentType {
  async execute(params: UpdateAppointmentTypeParams) {
    const trx = transactionContext.get()

    const appointmentType = await AppointmentType.findOrFail(params.id, { client: trx })

    appointmentType.merge({
      name: params.name,
      color: params.color,
      duration: params.duration,
      price: params.price,
      description: params.description,
    })

    await appointmentType.save()

    return { appointmentType }
  }
}
