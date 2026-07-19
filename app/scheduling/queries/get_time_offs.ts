import type { DateTime } from 'luxon'
import TimeOff from '#scheduling/models/time_off'
import type { UUID } from '#shared/types'

interface GetTimeOffsParams {
  tenantId: UUID
  from: DateTime
  to: DateTime
}

export class GetTimeOffs {
  async execute(params: GetTimeOffsParams) {
    const timeOffs = await TimeOff.query()
      .where('tenant_id', params.tenantId)
      .where('start', '<=', params.to.toFormat('yyyy-MM-dd'))
      .where('end', '>=', params.from.toFormat('yyyy-MM-dd'))
      .orderBy('start')
    return { timeOffs }
  }
}
