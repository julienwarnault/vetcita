import { transactionContext } from '#app/shared/contexts/transaction_context'
import type { UUID } from '#app/shared/types'
import Tenant from '#tenants/models/tenant'

interface DeleteTenantParams {
  id: UUID
}

export class DeleteTenant {
  async execute(params: DeleteTenantParams) {
    const trx = transactionContext.get()

    const tenant = await Tenant.findOrFail(params.id, { client: trx })

    await tenant.delete()
  }
}
