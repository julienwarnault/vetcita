import { inject } from '@adonisjs/core'
import { SearchAppointments } from '#booking/queries/search_appointments'
import { SearchClients } from '#clients/queries/search_clients'
import type { UUID } from '#shared/types'

interface SearchParams {
  tenantId: UUID
  search?: string
}

@inject()
export class Search {
  constructor(
    private readonly searchClients: SearchClients,
    private readonly searchAppointments: SearchAppointments
  ) {}

  async execute(params: SearchParams) {
    const search = params.search?.trim()

    const { clients } = await this.searchClients.execute({
      tenantId: params.tenantId,
      search,
      limit: 40,
    })

    const { appointments } = await this.searchAppointments.execute({
      tenantId: params.tenantId,
      clientIds: search && clients?.length > 0 ? clients.map((client) => client.id) : undefined,
      search,
      limit: 40,
    })

    return { search: search ?? '', clients, appointments }
  }
}
