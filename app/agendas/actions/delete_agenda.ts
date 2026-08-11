import { AgendaDeletionNotAllowedException } from '#agendas/exceptions/agenda_deletion_not_allowed_exception'
import { transactionContext } from '#shared/contexts/transaction_context'
import Agenda from '#agendas/models/agenda'
import type { UUID } from '#shared/types'

interface DeleteAgendaParams {
  id: UUID
}

export class DeleteAgenda {
  async execute(params: DeleteAgendaParams) {
    const trx = transactionContext.get()

    const agenda = await Agenda.findOrFail(params.id, { client: trx })

    if (agenda.role === 'owner') {
      throw new AgendaDeletionNotAllowedException()
    }

    await agenda.delete()
  }
}
