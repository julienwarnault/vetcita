import { transactionContext } from '#shared/contexts/transaction_context'
import Client from '#clients/models/client'
import type { UUID } from '#shared/types'

interface CreateClientParams {
  firstName: string
  lastName: string
  email?: string
  phone: string
  notes?: string
  tenantId: UUID
}

export class CreateClient {
  async execute(params: CreateClientParams) {
    const trx = transactionContext.get()

    const client = await Client.create(
      {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email?.toLowerCase().trim() || null,
        phone: params.phone,
        notes: params.notes || null,
        tenantId: params.tenantId,
      },
      { client: trx }
    )

    return { client }
  }
}
