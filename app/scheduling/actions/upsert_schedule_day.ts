import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import ScheduleDay from '#scheduling/models/schedule_day'
import type { UUID } from '#shared/types'

interface UpsertScheduleDayParams {
  tenantId: UUID
  agendaId: UUID
  date: DateTime
  shifts: Array<{ startTime: string; endTime: string }>
}

export class UpsertScheduleDay {
  async execute(params: UpsertScheduleDayParams) {
    const trx = transactionContext.get()

    const scheduleDay = await ScheduleDay.updateOrCreate(
      { date: params.date, agendaId: params.agendaId, tenantId: params.tenantId },
      { shifts: params.shifts ?? [] },
      { client: trx }
    )

    return { scheduleDay }
  }
}
