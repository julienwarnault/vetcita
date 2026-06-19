import { transactionContext } from '#shared/contexts/transaction_context'
import AppointmentType from '#appointment_types/models/appointment_type'
import type { UUID } from '#shared/types'

interface DeleteAppointmentTypeParams {
  id: UUID
}

export class DeleteAppointmentType {
  async execute(params: DeleteAppointmentTypeParams) {
    const trx = transactionContext.get()

    const appointmentType = await AppointmentType.findOrFail(params.id, { client: trx })

    await appointmentType.delete()
  }
}
