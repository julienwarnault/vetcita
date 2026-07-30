import { transactionContext } from '#shared/contexts/transaction_context'
import Agenda, { AgendaRole } from '#agendas/models/agenda'
import type { UUID } from '#shared/types'

interface UpdateAgendaParams {
  id: UUID
  name: string
  email?: string | null
  role: AgendaRole
  color: string
  userId?: UUID
  serviceIds?: UUID[]
}

export class UpdateAgenda {
  async execute(params: UpdateAgendaParams) {
    const trx = transactionContext.get()

    const agenda = await Agenda.findOrFail(params.id, { client: trx })

    agenda.merge({
      name: params.name,
      email: params.email ?? null,
      role: agenda.role === AgendaRole.owner ? agenda.role : params.role,
      color: params.color,
      userId: params.userId ?? agenda.userId,
    })

    await agenda.useTransaction(trx!).save()

    await agenda.related('services').sync(params.serviceIds || [], true, trx)

    return { agenda }
  }
}
