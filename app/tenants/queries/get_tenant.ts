import type { UUID } from '#shared/types'
import Tenant from '#tenants/models/tenant'

interface GetTenantParams {
  id: UUID
}

export class GetTenant {
  async execute(params: GetTenantParams) {
    const tenant = await Tenant.findOrFail(params.id)

    return { tenant }
  }
}
