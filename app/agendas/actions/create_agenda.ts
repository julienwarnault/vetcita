import { transactionContext } from '#shared/contexts/transaction_context'
import Agenda, { type AgendaRole } from '#agendas/models/agenda'
import WorkingHour from '#scheduling/models/working_hour'
import type { UUID } from '#shared/types'

interface CreateAgendaParams {
  name: string
  email?: string | null
  role: AgendaRole
  color: string
  userId?: UUID
  serviceIds?: UUID[]
  tenantId: UUID
}

export class CreateAgenda {
  async execute(params: CreateAgendaParams) {
    const trx = transactionContext.get()

    // Create agenda
    const agenda = await Agenda.create(
      {
        name: params.name,
        email: params.email,
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
      [1, 2, 3, 4, 5].map((dayOfWeek) => ({
        tenantId: params.tenantId,
        agendaId: agenda.id,
        dayOfWeek,
        startTime: dayOfWeek === 5 ? '09:00' : '09:00',
        endTime: dayOfWeek === 5 ? '14:00' : '18:00',
      })),
      { client: trx }
    )

    return { agenda }
  }
}
