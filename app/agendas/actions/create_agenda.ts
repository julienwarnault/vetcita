import { transactionContext } from '#app/shared/contexts/transaction_context'
import type { UUID } from '#app/shared/types'
import Agenda from '#agendas/models/agenda'

interface CreateAgendaParams {
  name: string
  color: string
  appointmentTypeIds?: UUID[]
  tenantId: UUID
}

export class CreateAgenda {
  async execute(params: CreateAgendaParams) {
    const trx = transactionContext.get()

    const agenda = await Agenda.create(
      {
        name: params.name,
        color: params.color,
        tenantId: params.tenantId,
      },
      { client: trx }
    )

    await agenda.related('appointmentTypes').sync(params.appointmentTypeIds || [], true, trx)

    return { agenda }
  }
}
