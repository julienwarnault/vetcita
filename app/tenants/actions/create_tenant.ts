import string from '@adonisjs/core/helpers/string'
import { transactionContext } from '#shared/contexts/transaction_context'
import Tenant, { type OnboardingStatus } from '#tenants/models/tenant'

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
  onboardingStatus?: OnboardingStatus
}

export class CreateTenant {
  async execute(params: CreateTenantParams) {
    const trx = transactionContext.get()

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
        openingHours: [],
      },
      { client: trx }
    )

    return { tenant }
  }
}
