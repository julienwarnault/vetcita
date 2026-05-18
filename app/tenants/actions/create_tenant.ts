import string from '@adonisjs/core/helpers/string'
import { transactionContext } from '#app/shared/contexts/transaction_context'
import Tenant from '#tenants/models/tenant'

interface CreateTenantParams {
  name: string
}

export class CreateTenant {
  async execute(params: CreateTenantParams) {
    const trx = transactionContext.get()

    const tenant = await Tenant.create(
      {
        name: params.name,
        slug: string.slug(params.name),
      },
      { client: trx }
    )

    return { tenant }
  }
}
