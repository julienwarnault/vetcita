import Location from '#tenants/models/location'
import type { UUID } from '#shared/types'

interface GetLocationSpeciesParams {
  tenantId: UUID
  locationId: UUID
}

export class GetLocationSpecies {
  async execute(params: GetLocationSpeciesParams) {
    const location = await Location.query()
      .where('id', params.locationId)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    const species = await location.related('species').query().orderBy('order')

    return { species }
  }
}
