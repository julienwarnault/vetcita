import { transactionContext } from '#shared/contexts/transaction_context'
import Client from '#clients/models/client'
import type { UUID } from '#shared/types'

interface UpdateClientParams {
  id: UUID
  tenantId: UUID
  firstName: string
  lastName: string
  email?: string
  phone: string
  notes?: string
}

export class UpdateClient {
  async execute(params: UpdateClientParams) {
    const trx = transactionContext.get()

    const client = await Client.query({ client: trx })
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    client.merge({
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email?.toLowerCase().trim() || null,
      phone: params.phone,
      notes: params.notes || null,
    })

    await client.save()

    return { client }
  }
}
