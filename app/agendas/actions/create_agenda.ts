import { inject } from '@adonisjs/core'
import { AgendaAlreadyExistsException } from '#agendas/exceptions/agenda_already_exists_exception'
import { transactionContext } from '#shared/contexts/transaction_context'
import { SendInvitation } from '#agendas/actions/send_invitation'
import Agenda, { type AgendaRole } from '#agendas/models/agenda'
import WorkingHour from '#scheduling/models/working_hour'
import Tenant from '#tenants/models/tenant'
import type { UUID } from '#shared/types'

interface CreateAgendaParams {
  firstName: string
  lastName?: string
  phone?: string | null
  email?: string | null
  role: AgendaRole
  color: string
  userId?: UUID
  serviceIds?: UUID[]
  tenantId: UUID
  invitedByUserId?: UUID
}

@inject()
export class CreateAgenda {
  constructor(private readonly sendInvitation: SendInvitation) {}

  async execute(params: CreateAgendaParams) {
    const trx = transactionContext.get()
    const normalizedPhone = params.phone?.trim() || null
    const normalizedEmail = params.email?.trim().toLowerCase() ?? null

    const tenant = await Tenant.query({ client: trx }).where('id', params.tenantId).preload('location').firstOrFail()

    if (!tenant.location) {
      throw new Error('Business clinic is required to create an agenda')
    }

    if (normalizedEmail) {
      const existingAgenda = await Agenda.query({ client: trx })
        .where('tenant_id', params.tenantId)
        .whereILike('email', normalizedEmail)
        .first()

      if (existingAgenda) {
        throw new AgendaAlreadyExistsException()
      }
    }

    const agenda = await Agenda.create(
      {
        firstName: params.firstName,
        lastName: params.lastName,
        phone: normalizedPhone,
        email: normalizedEmail,
        color: params.color,
        userId: params.userId,
        tenantId: params.tenantId,
        role: params.role,
      },
      { client: trx }
    )

    // Sync services
    await agenda.related('services').sync(params.serviceIds || [], true, trx)

    // Init working hours
    await WorkingHour.createMany(
      tenant.location.openingHours
        .map((day, dayOfWeek) => {
          return day.map(({ startTime, endTime }) => ({
            tenantId: params.tenantId,
            agendaId: agenda.id,
            dayOfWeek: dayOfWeek + 1,
            startTime,
            endTime,
          }))
        })
        .flat(),
      { client: trx }
    )

    // Send invitation
    if (params.role !== 'none' && params.invitedByUserId) {
      await this.sendInvitation.execute({
        agendaId: agenda.id,
        tenantId: params.tenantId,
        invitedByUserId: params.invitedByUserId,
      })
    }

    return { agenda }
  }
}
