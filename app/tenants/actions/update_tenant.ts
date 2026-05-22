import string from '@adonisjs/core/helpers/string'
import { transactionContext } from '#app/shared/contexts/transaction_context'
import type { UUID } from '#app/shared/types'
import Tenant from '#tenants/models/tenant'

interface UpdateTenantParams {
  id: UUID
  name: string
  phone?: string
  website?: string
}

export class UpdateTenant {
  async execute(params: UpdateTenantParams) {
    const trx = transactionContext.get()

    const tenant = await Tenant.findOrFail(params.id, { client: trx })

    tenant.merge({
      name: params.name,
      slug: string.slug(params.name),
      phone: params.phone || '',
      website: params.website || '',
    })

    await tenant.save()

    return { tenant }
  }
}
