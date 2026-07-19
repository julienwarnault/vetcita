import TimeOff from '#scheduling/models/time_off'
import type { UUID } from '#shared/types'

interface GetTimeOffParams {
  id: UUID
  tenantId: UUID
}

export class GetTimeOff {
  async execute(params: GetTimeOffParams) {
    const timeOff = await TimeOff.query().where('id', params.id).where('tenantId', params.tenantId).firstOrFail()

    return { timeOff }
  }
}
