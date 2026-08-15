import { transactionContext } from '#shared/contexts/transaction_context'
import { ClientAlreadyExistsException } from '#clients/exceptions/client_already_exists_exception'
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
    const phone = params.phone.trim()

    const client = await Client.query({ client: trx })
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    const existingClient = await Client.query({ client: trx })
      .where('tenant_id', params.tenantId)
      .where('phone', phone)
      .whereNot('id', client.id)
      .first()

    if (existingClient) {
      throw new ClientAlreadyExistsException()
    }

    client.merge({
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email?.toLowerCase().trim() || null,
      phone,
      notes: params.notes || null,
    })

    await client.useTransaction(trx!).save()

    return { client }
  }
}
