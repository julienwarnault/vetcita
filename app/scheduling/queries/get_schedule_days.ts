import type { DateTime } from 'luxon'
import ScheduleDay from '#scheduling/models/schedule_day'
import type { UUID } from '#shared/types'

interface GetScheduleDaysParams {
  tenantId: UUID
  from: DateTime
  to: DateTime
}

export class GetScheduleDays {
  async execute(params: GetScheduleDaysParams) {
    const scheduleDays = await ScheduleDay.query()
      .where('tenant_id', params.tenantId)
      .where('date', '<=', params.to.toFormat('yyyy-MM-dd'))
      .where('date', '>=', params.from.toFormat('yyyy-MM-dd'))
      .orderBy('date')

    return { scheduleDays }
  }
}
