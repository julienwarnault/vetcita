import { transactionContext } from '#shared/contexts/transaction_context'
import Agenda from '#agendas/models/agenda'
import type { UUID } from '#shared/types'

interface UpdateAgendaParams {
  id: UUID
  name: string
  color: string
  appointmentTypeIds?: UUID[]
}

export class UpdateAgenda {
  async execute(params: UpdateAgendaParams) {
    const trx = transactionContext.get()

    const agenda = await Agenda.findOrFail(params.id, { client: trx })

    agenda.merge({
      name: params.name,
      color: params.color,
    })

    await agenda.useTransaction(trx!).save()

    await agenda.related('appointmentTypes').sync(params.appointmentTypeIds || [], true, trx)

    return { agenda }
  }
}
