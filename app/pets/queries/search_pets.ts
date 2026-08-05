import type { UUID } from '#shared/types'
import Pet from '#pets/models/pet'

interface SearchPetsParams {
  tenantId: UUID
  search?: string
  limit: number
}

export class SearchPets {
  async execute(params: SearchPetsParams) {
    const query = Pet.query()
      .where('tenantId', params.tenantId)
      .preload('owner')
      .preload('species')
      .orderBy('createdAt', 'desc')
      .limit(params.limit)

    if (params.search) {
      const term = `%${params.search}%`
      query.whereILike('name', term)
    }

    const pets = await query

    return { pets }
  }
}
