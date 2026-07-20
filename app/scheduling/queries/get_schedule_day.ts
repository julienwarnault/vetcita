import ScheduleDay from '#scheduling/models/schedule_day'
import type { UUID } from '#shared/types'

interface GetScheduleDayParams {
  id: UUID
  tenantId: UUID
}

export class GetScheduleDay {
  async execute(params: GetScheduleDayParams) {
    const scheduleDay = await ScheduleDay.query()
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    return { scheduleDay }
  }
}
