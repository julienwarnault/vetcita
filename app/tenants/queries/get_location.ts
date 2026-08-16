import Location from '#tenants/models/location'
import type { UUID } from '#shared/types'

interface GetLocationParams {
  id: UUID
  tenantId?: UUID
}

export class GetLocation {
  async execute(params: GetLocationParams) {
    const query = Location.query().where('id', params.id).preload('species')

    if (params.tenantId) {
      query.where('tenant_id', params.tenantId)
    }

    const location = await query.firstOrFail()

    return { location }
  }
}
