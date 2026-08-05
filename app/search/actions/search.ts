import { inject } from '@adonisjs/core'
import { SearchAppointments } from '#booking/queries/search_appointments'
import { SearchClients } from '#clients/queries/search_clients'
import { SearchPets } from '#pets/queries/search_pets'
import type { UUID } from '#shared/types'

interface SearchParams {
  tenantId: UUID
  search?: string
}

@inject()
export class Search {
  constructor(
    private readonly searchClients: SearchClients,
    private readonly searchPets: SearchPets,
    private readonly searchAppointments: SearchAppointments
  ) {}

  async execute(params: SearchParams) {
    const search = params.search?.trim()

    const { clients } = await this.searchClients.execute({
      tenantId: params.tenantId,
      search,
      limit: 40,
    })

    const { pets } = await this.searchPets.execute({
      tenantId: params.tenantId,
      search,
      limit: 40,
    })

    const mergedClients = [...clients]
    const clientIds = new Set<UUID>(clients.map((client) => client.id))
    const petIds = search ? pets.map((pet) => pet.id) : []

    if (search) {
      for (const pet of pets) {
        if (!pet.owner || clientIds.has(pet.owner.id)) {
          continue
        }

        clientIds.add(pet.owner.id)
        mergedClients.push(pet.owner)
      }
    }

    const { appointments } = await this.searchAppointments.execute({
      tenantId: params.tenantId,
      clientIds: search && clientIds.size > 0 ? [...clientIds] : undefined,
      petIds: search && petIds.length > 0 ? petIds : undefined,
      search,
      limit: 40,
    })

    return { search: search ?? '', clients: mergedClients, pets, appointments }
  }
}
