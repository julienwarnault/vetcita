import Service from '#services/models/service'
import type { UUID } from '#shared/types'

interface GetServiceParams {
  id: UUID
  tenantId?: UUID
}

export class GetService {
  async execute(params: GetServiceParams) {
    const query = Service.query().where('id', params.id).preload('agendas')

    if (params.tenantId) {
      query.where('tenant_id', params.tenantId)
    }

    const service = await query.firstOrFail()

    return { service }
  }
}
