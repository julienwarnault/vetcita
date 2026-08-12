import { transactionContext } from '#shared/contexts/transaction_context'
import Tenant from '#tenants/models/tenant'
import type { UUID } from '#shared/types'

interface UpdateTenantParams {
  id: UUID
  name: string
  phone: string
  email?: string
}

export class UpdateTenant {
  async execute(params: UpdateTenantParams) {
    const trx = transactionContext.get()

    const tenant = await Tenant.findOrFail(params.id, { client: trx })

    tenant.merge({
      name: params.name,
      email: params.email?.trim().toLowerCase() || null,
      phone: params.phone || null,
    })

    await tenant.useTransaction(trx!).save()

    return { tenant }
  }
}
