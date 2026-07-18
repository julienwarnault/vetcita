import type { DateTime } from 'luxon'
import ClosedDate from '#scheduling/models/closed_date'
import type { UUID } from '#shared/types'

interface GetClosedDatesParams {
  tenantId: UUID
  from: DateTime
  to: DateTime
}

export class GetClosedDates {
  async execute(params: GetClosedDatesParams) {
    const closedDates = await ClosedDate.query()
      .where('tenant_id', params.tenantId)
      .where('start', '<=', params.to.toFormat('yyyy-MM-dd'))
      .where('end', '>=', params.from.toFormat('yyyy-MM-dd'))
      .orderBy('start')
    return { closedDates }
  }
}
