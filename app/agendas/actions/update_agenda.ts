import { AgendaAlreadyExistsException } from '#agendas/exceptions/agenda_already_exists_exception'
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
  tenantId: UUID
}

export class UpdateAgenda {
  async execute(params: UpdateAgendaParams) {
    const trx = transactionContext.get()
    const normalizedPhone = params.phone?.trim() || null
    const normalizedEmail = params.email?.trim().toLowerCase() ?? null

    const agenda = await Agenda.query({ client: trx })
      .where('id', params.id)
      .where('tenant_id', params.tenantId)
      .firstOrFail()

    if (normalizedEmail) {
      const existingAgenda = await Agenda.query({ client: trx })
        .where('tenant_id', params.tenantId)
        .whereILike('email', normalizedEmail)
        .whereNot('id', agenda.id)
        .first()

      if (existingAgenda) {
        throw new AgendaAlreadyExistsException()
      }
    }

    agenda.merge({
      firstName: params.firstName,
      lastName: params.lastName,
      phone: normalizedPhone,
      email: normalizedEmail,
      role: agenda.role === 'owner' ? agenda.role : params.role,
      color: params.color,
      userId: params.role === 'none' ? null : (params.userId ?? agenda.userId),
    })

    await agenda.useTransaction(trx!).save()

    await agenda.related('services').sync(params.serviceIds || [], true, trx)

    return { agenda }
  }
}
