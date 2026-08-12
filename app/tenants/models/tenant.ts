import { hasOne } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { TenantSchema } from '#database/schema'
import Location from '#tenants/models/location'

export type OnboardingStatus = 'pending' | 'completed'

export default class Tenant extends compose(TenantSchema, WithPrimaryUuid) {
  declare onboardingStatus: OnboardingStatus

  @hasOne(() => Location)
  declare location: HasOne<typeof Location>
}
