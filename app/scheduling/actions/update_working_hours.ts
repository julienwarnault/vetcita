import { transactionContext } from '#shared/contexts/transaction_context'
import WorkingHour from '#scheduling/models/working_hour'
import type { UUID } from '#shared/types'

interface UpdateWorkingHoursParams {
  agendaId: UUID
  tenantId: UUID
  weekShifts: { startTime: string; endTime: string }[][]
}

export class UpdateWorkingHours {
  async execute(params: UpdateWorkingHoursParams) {
    const trx = transactionContext.get()

    await WorkingHour.query({ client: trx })
      .where('tenantId', params.tenantId)
      .where('agendaId', params.agendaId)
      .delete()

    const workingHours = await WorkingHour.createMany(
      params.weekShifts.flatMap((ranges, i) =>
        ranges.map(({ startTime, endTime }) => ({
          tenantId: params.tenantId,
          agendaId: params.agendaId,
          dayOfWeek: i + 1,
          startTime,
          endTime,
        }))
      ),
      { client: trx }
    )

    return { workingHours }
  }
}
