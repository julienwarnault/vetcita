import type { UUID } from '#shared/types'
import Pet from '#pets/models/pet'

interface GetPetsParams {
  tenantId: UUID
  search?: string
}

export class GetPets {
  async execute(params: GetPetsParams) {
    const query = Pet.query().where('tenantId', params.tenantId).preload('patient').preload('species').preload('breed')

    if (params.search) {
      const term = `%${params.search}%`

      query.where((builder) => {
        builder.whereILike('name', term)
      })
    }

    const pets = await query

    return { pets }
  }
}
