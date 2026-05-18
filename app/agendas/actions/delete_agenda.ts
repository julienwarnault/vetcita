import { transactionContext } from '#app/shared/contexts/transaction_context'
import type { UUID } from '#app/shared/types'
import Agenda from '#agendas/models/agenda'

interface DeleteAgendaParams {
  id: UUID
}

export class DeleteAgenda {
  async execute(params: DeleteAgendaParams) {
    const trx = transactionContext.get()

    const agenda = await Agenda.findOrFail(params.id, { client: trx })

    await agenda.delete()
  }
}
