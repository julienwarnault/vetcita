import { transactionContext } from '#app/shared/contexts/transaction_context'
import WorkingHour from '#scheduling/models/working_hour'
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

    // Create agenda
    const agenda = await Agenda.create(
      {
        name: params.name,
        color: params.color,
        tenantId: params.tenantId,
      },
      { client: trx }
    )

    // Sync appointment types
    await agenda.related('appointmentTypes').sync(params.appointmentTypeIds || [], true, trx)

    // Init working hours
    await WorkingHour.createMany(
      [1, 2, 3, 4, 5].map((dayOfWeek) => ({
        tenantId: params.tenantId,
        agendaId: agenda.id,
        dayOfWeek,
        startTime: '08:00',
        endTime: '19:00',
      })),
      { client: trx }
    )

    return { agenda }
  }
}
