import type { UUID } from '#shared/types'
import Pet from '#pets/models/pet'

interface GetClientPetsParams {
  tenantId: UUID
  clientId: UUID
}

export class GetClientPets {
  async execute(params: GetClientPetsParams) {
    const pets = await Pet.query()
      .where('tenantId', params.tenantId)
      .where('client_id', params.clientId)
      .preload('owner')
      .preload('species')

    return { pets }
  }
}
