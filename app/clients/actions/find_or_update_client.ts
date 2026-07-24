import { transactionContext } from '#shared/contexts/transaction_context'
import Client from '#clients/models/client'
import type { UUID } from '#shared/types'

interface FindOrUpdateClientParams {
  tenantId: UUID
  firstName: string
  lastName: string
  phone: string
  email?: string
}

export class FindOrUpdateClient {
  async handle(params: FindOrUpdateClientParams) {
    const trx = transactionContext.get()

    const client = await Client.updateOrCreate(
      { phone: params.phone, tenantId: params.tenantId },
      {
        tenantId: params.tenantId,
        firstName: params.firstName?.toUpperCase().trim(),
        lastName: params.lastName,
        phone: params.phone,
        email: params.email?.toLowerCase().trim() || null,
      },
      {
        client: trx,
      }
    )

    return { client }
  }
}
