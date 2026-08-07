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

      query.where((builder) => {
        builder.whereILike('name', term).orWhereHas('owner', (ownerQuery) => {
          ownerQuery
            .whereILike('phone', term)
            .orWhereILike('email', term)
            .orWhereRaw(`CONCAT(first_name, ' ', last_name) ILIKE ?`, [term])
            .orWhereRaw(`CONCAT(last_name, ' ', first_name) ILIKE ?`, [term])
        })
      })
    }

    const pets = await query

    return { pets }
  }
}
