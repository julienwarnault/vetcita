import { attachmentManager } from '@jrmc/adonis-attachment'
import type { MultipartFile } from '@adonisjs/core/bodyparser'
import { transactionContext } from '#shared/contexts/transaction_context'
import Location from '#tenants/models/location'
import type { UUID } from '#shared/types'

interface UpdateLocationParams {
  id: UUID
  tenantId: UUID
  name: string
  phone: string
  email?: string
  website?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
  countryCode?: string
  cover?: MultipartFile | null
  logo?: MultipartFile | null
  removeCover?: boolean
  removeLogo?: boolean
  speciesIds: UUID[]
}

export class UpdateLocation {
  async execute(params: UpdateLocationParams) {
    const trx = transactionContext.get()

    const location = await Location.query({ client: trx })
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    location.merge({
      name: params.name,
      email: params.email?.trim().toLowerCase() || null,
      phone: params.phone || null,
      website: params.website || null,
      address: params.address || null,
      city: params.city || null,
      state: params.state || null,
      postalCode: params.postalCode || null,
      countryCode: params.countryCode || 'MX',
      openingHours: location.openingHours,
    })

    if (params.removeCover) {
      location.cover = null
    }

    if (params.cover) {
      location.cover = await attachmentManager.createFromFile(params.cover)
    }

    if (params.removeLogo) {
      location.logo = null
    }

    if (params.logo) {
      location.logo = await attachmentManager.createFromFile(params.logo)
    }

    await location.useTransaction(trx!).save()

    await location.related('species').sync(params.speciesIds, true, trx)

    return { location }
  }
}
