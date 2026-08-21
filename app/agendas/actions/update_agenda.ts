import { inject } from '@adonisjs/core'
import { AgendaAlreadyExistsException } from '#agendas/exceptions/agenda_already_exists_exception'
import { transactionContext } from '#shared/contexts/transaction_context'
import { SendInvitation } from '#agendas/actions/send_invitation'
import Agenda, { type AgendaRole } from '#agendas/models/agenda'
import Invitation from '#agendas/models/invitation'
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
  invitedByUserId: UUID
}

@inject()
export class UpdateAgenda {
  constructor(private readonly sendInvitation: SendInvitation) {}

  async execute(params: UpdateAgendaParams) {
    const trx = transactionContext.get()
    const normalizedPhone = params.phone?.trim() || null
    const normalizedEmail = params.email?.trim().toLowerCase() ?? null

    const agenda = await Agenda.query({ client: trx })
      .where('id', params.id)
      .where('tenant_id', params.tenantId)
      .firstOrFail()

    if (!agenda.userId && normalizedEmail) {
      const existingAgenda = await Agenda.query({ client: trx })
        .where('tenant_id', params.tenantId)
        .whereILike('email', normalizedEmail)
        .whereNot('id', agenda.id)
        .first()

      if (existingAgenda) {
        throw new AgendaAlreadyExistsException()
      }
    }

    const role = agenda.role === 'owner' || agenda.userId ? agenda.role : params.role
    const emailChanged = !agenda.userId && agenda.email !== normalizedEmail
    const accessEnabled = agenda.role === 'none' && role !== 'none'
    const accessDisabled = agenda.role !== 'none' && role === 'none'

    agenda.merge({
      firstName: params.firstName,
      lastName: params.lastName,
      email: agenda.userId ? agenda.email : normalizedEmail,
      phone: normalizedPhone,
      role,
      color: params.color,
      userId: role === 'none' ? null : (params.userId ?? agenda.userId),
    })

    await agenda.useTransaction(trx!).save()

    await agenda.related('services').sync(params.serviceIds || [], true, trx)

    if (accessDisabled) {
      await Invitation.query({ client: trx })
        .where('tenant_id', params.tenantId)
        .where('agenda_id', agenda.id)
        .where('status', 'pending')
        .update({ status: 'revoked' })
    }

    if (role !== 'none' && !agenda.userId && (emailChanged || accessEnabled)) {
      await this.sendInvitation.execute({
        agendaId: agenda.id,
        tenantId: params.tenantId,
        invitedByUserId: params.invitedByUserId,
      })
    }

    return { agenda }
  }
}
