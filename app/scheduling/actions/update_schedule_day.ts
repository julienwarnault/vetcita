import { transactionContext } from '#shared/contexts/transaction_context'
import ScheduleDay from '#scheduling/models/schedule_day'
import type { UUID } from '#shared/types'

interface UpdateScheduleDayParams {
  id: UUID
  shifts: Array<{ startTime: string; endTime: string }>
}

export class UpdateScheduleDay {
  async execute(params: UpdateScheduleDayParams) {
    const trx = transactionContext.get()

    const scheduleDay = await ScheduleDay.findOrFail(params.id, { client: trx })

    await scheduleDay.merge({
      shifts: params.shifts,
    })

    await scheduleDay.useTransaction(trx!).save()

    return { scheduleDay }
  }
}
