import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import ScheduleDay from '#scheduling/models/schedule_day'
import type { UUID } from '#shared/types'

interface CreateScheduleDayParams {
  tenantId: UUID
  agendaId: UUID
  date: DateTime
  shifts: Array<{ startTime: string; endTime: string }>
}

export class CreateScheduleDay {
  async execute(params: CreateScheduleDayParams) {
    const trx = transactionContext.get()

    const scheduleDay = await ScheduleDay.create(
      {
        date: params.date,
        agendaId: params.agendaId,
        tenantId: params.tenantId,
        shifts: params.shifts ?? [],
      },
      { client: trx }
    )

    return { scheduleDay }
  }
}
