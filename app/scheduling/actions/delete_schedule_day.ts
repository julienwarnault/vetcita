import { transactionContext } from '#shared/contexts/transaction_context'
import ScheduleDay from '#scheduling/models/schedule_day'
import type { UUID } from '#shared/types'

interface DeleteScheduleDayParams {
  id: UUID
}

export class DeleteScheduleDay {
  async execute(params: DeleteScheduleDayParams) {
    const trx = transactionContext.get()

    const scheduleDay = await ScheduleDay.findOrFail(params.id, { client: trx })

    await scheduleDay.delete()
  }
}
