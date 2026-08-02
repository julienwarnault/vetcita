import string from '@adonisjs/core/helpers/string'
import { transactionContext } from '#shared/contexts/transaction_context'
import Tenant from '#tenants/models/tenant'
import type { UUID } from '#shared/types'

interface UpdateTenantParams {
  id: UUID
  name: string
  email?: string
  phone?: string
  website?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
  countryCode?: string
}

export class UpdateTenant {
  async execute(params: UpdateTenantParams) {
    const trx = transactionContext.get()

    const tenant = await Tenant.findOrFail(params.id, { client: trx })

    tenant.merge({
      name: params.name,
      slug: string.slug(params.name),
      email: params.email?.trim().toLowerCase() || null,
      phone: params.phone || null,
      website: params.website || null,
      address: params.address || null,
      city: params.city || null,
      state: params.state || null,
      postalCode: params.postalCode || null,
      countryCode: params.countryCode || 'MX',
    })

    await tenant.save()

    return { tenant }
  }
}
