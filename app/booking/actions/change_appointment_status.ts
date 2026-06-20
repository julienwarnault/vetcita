import { transactionContext } from '#shared/contexts/transaction_context'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

interface ChangeAppointmentStatusParams {
  id: UUID
  tenantId: UUID
  statusId: string
}

export class ChangeAppointmentStatus {
  async execute(params: ChangeAppointmentStatusParams) {
    const trx = transactionContext.get()

    const appointment = await Appointment.query({ client: trx })
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    appointment.merge({ statusId: params.statusId })

    await appointment.useTransaction(trx!).save()

    return { appointment }
  }
}
