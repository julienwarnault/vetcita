import Service from '#services/models/service'
import type { UUID } from '#shared/types'

interface GetServicesParams {
  tenantId: UUID
  search?: string
}

export class GetServices {
  async execute(params: GetServicesParams) {
    const query = Service.query().where('tenantId', params.tenantId)

    if (params.search) {
      query.where((q) => q.whereILike('name', `%${params.search}%`))
    }

    const services = await query

    return { services }
  }
}
