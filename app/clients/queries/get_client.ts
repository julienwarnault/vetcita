import Client from '#clients/models/client'
import type { UUID } from '#shared/types'

interface GetClientParams {
  id: UUID
  tenantId: UUID
}

export class GetClient {
  async execute(params: GetClientParams) {
    const client = await Client.query().where('id', params.id).where('tenantId', params.tenantId).firstOrFail()

    return { client }
  }
}
