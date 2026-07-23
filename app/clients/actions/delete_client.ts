import { transactionContext } from '#shared/contexts/transaction_context'
import Client from '#clients/models/client'
import type { UUID } from '#shared/types'

interface DeleteClientParams {
  id: UUID
  tenantId: UUID
}

export class DeleteClient {
  async execute(params: DeleteClientParams) {
    const trx = transactionContext.get()

    const client = await Client.query({ client: trx })
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    await client.delete()
  }
}
