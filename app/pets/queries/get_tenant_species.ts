import Species from '#pets/models/species'
import type { UUID } from '#shared/types'

interface GetTenantSpeciesParams {
  tenantId: UUID
}

export class GetTenantSpecies {
  async execute(params: GetTenantSpeciesParams) {
    const species = await Species.query()
      .whereHas('locations', (q) => q.where('tenant_id', params.tenantId))
      .orderBy('order')

    return { species }
  }
}
