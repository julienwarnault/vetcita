import type { UUID } from '#shared/types'
import Pet from '#pets/models/pet'

interface GetPetParams {
  id: UUID
  tenantId: UUID
}

export class GetPet {
  async execute(params: GetPetParams) {
    const pet = await Pet.query()
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .preload('client')
      .preload('species')
      .preload('breed')
      .firstOrFail()

    return { pet }
  }
}
