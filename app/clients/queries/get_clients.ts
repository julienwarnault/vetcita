import Client from '#clients/models/client'
import type { UUID } from '#shared/types'

interface GetClientsParams {
  tenantId: UUID
  search?: string
}

export class GetClients {
  async execute(params: GetClientsParams) {
    const query = Client.query().where('tenantId', params.tenantId).preload('pets')

    if (params.search) {
      const term = `%${params.search}%`

      query.where((builder) => {
        builder
          .whereILike('phone', term)
          .orWhereILike('email', term)
          .orWhereRaw(`CONCAT(first_name, ' ', last_name) ILIKE ?`, [term])
          .orWhereRaw(`CONCAT(last_name, ' ', first_name) ILIKE ?`, [term])
      })
    }

    const clients = await query

    return { clients }
  }
}
