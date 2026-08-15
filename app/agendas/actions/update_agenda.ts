import { transactionContext } from '#shared/contexts/transaction_context'
import Agenda, { type AgendaRole } from '#agendas/models/agenda'
import type { UUID } from '#shared/types'

interface UpdateAgendaParams {
  id: UUID
  firstName: string
  lastName?: string
  phone?: string | null
  email?: string | null
  role: AgendaRole
  color: string
  userId?: UUID
  serviceIds?: UUID[]
}

export class UpdateAgenda {
  async execute(params: UpdateAgendaParams) {
    const trx = transactionContext.get()
    const phone = params.phone?.trim() || null

    const agenda = await Agenda.findOrFail(params.id, { client: trx })

    agenda.merge({
      firstName: params.firstName,
      lastName: params.lastName,
      phone,
      email: params.email ?? null,
      role: agenda.role === 'owner' ? agenda.role : params.role,
      color: params.color,
      userId: params.role === 'none' ? null : (params.userId ?? agenda.userId),
    })

    await agenda.useTransaction(trx!).save()

    await agenda.related('services').sync(params.serviceIds || [], true, trx)

    return { agenda }
  }
}
