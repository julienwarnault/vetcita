import type { UUID } from '#shared/types'
import Location from '#tenants/models/location'

interface GetLocationParams {
  id: UUID
  tenantId?: UUID
}

export class GetLocation {
  async execute(params: GetLocationParams) {
    const query = Location.query().where('id', params.id)

    if (params.tenantId) {
      query.where('tenant_id', params.tenantId)
    }

    const location = await query.firstOrFail()

    return { location }
  }
}
