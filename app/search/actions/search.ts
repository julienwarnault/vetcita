import { inject } from '@adonisjs/core'
import { SearchAppointments } from '#booking/queries/search_appointments'
import { SearchPets } from '#pets/queries/search_pets'
import type { UUID } from '#shared/types'

interface SearchParams {
  tenantId: UUID
  search?: string
}

@inject()
export class Search {
  constructor(
    private readonly searchPets: SearchPets,
    private readonly searchAppointments: SearchAppointments
  ) {}

  async execute(params: SearchParams) {
    const search = params.search?.trim()

    const { pets } = await this.searchPets.execute({
      tenantId: params.tenantId,
      search,
      limit: 40,
    })

    const { appointments } = await this.searchAppointments.execute({
      tenantId: params.tenantId,
      petIds: search && pets?.length > 0 ? pets.map((pet) => pet.id) : undefined,
      search,
      limit: 40,
    })

    return { search: search ?? '', pets, appointments }
  }
}
