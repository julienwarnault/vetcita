import Client from '#clients/models/client'
import type { UUID } from '#shared/types'

interface SearchClientsParams {
  tenantId: UUID
  search?: string
  limit: number
}

export class SearchClients {
  async execute(params: SearchClientsParams) {
    const query = Client.query().where('tenant_id', params.tenantId).orderBy('created_at', 'desc').limit(params.limit)

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
