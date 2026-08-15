import { ClientAlreadyExistsException } from '#clients/exceptions/client_already_exists_exception'
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
    const phone = params.phone.trim()

    const existingClient = await Client.query({ client: trx })
      .where('tenant_id', params.tenantId)
      .where('phone', phone)
      .first()

    if (existingClient) {
      throw new ClientAlreadyExistsException()
    }

    const client = await Client.create(
      {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email?.toLowerCase().trim() || null,
        phone,
        notes: params.notes || null,
        tenantId: params.tenantId,
      },
      { client: trx }
    )

    return { client }
  }
}
