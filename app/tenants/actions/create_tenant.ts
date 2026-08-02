import string from '@adonisjs/core/helpers/string'
import { transactionContext } from '#shared/contexts/transaction_context'
import Tenant from '#tenants/models/tenant'

interface CreateTenantParams {
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

export class CreateTenant {
  async execute(params: CreateTenantParams) {
    const trx = transactionContext.get()

    // Opening hours
    const openingHours = [1, 2, 3, 4, 5, 6].map((dayOfWeek) => [
      { startTime: '09:00', endTime: dayOfWeek === 6 ? '14:00' : '18:00' },
    ])

    const tenant = await Tenant.create(
      {
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
        openingHours: openingHours,
      },
      { client: trx }
    )

    return { tenant }
  }
}
