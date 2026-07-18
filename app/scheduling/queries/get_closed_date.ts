import ClosedDate from '#scheduling/models/closed_date'
import type { UUID } from '#shared/types'

interface GetClosedDateParams {
  id: UUID
  tenantId: UUID
}

export class GetClosedDate {
  async execute(params: GetClosedDateParams) {
    const closedDate = await ClosedDate.query().where('id', params.id).where('tenantId', params.tenantId).firstOrFail()

    return { closedDate }
  }
}
