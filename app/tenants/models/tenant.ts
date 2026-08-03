import { column } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { TenantSchema } from '#database/schema'

export type OnboardingStatus = 'pending' | 'completed'

export default class Tenant extends compose(TenantSchema, WithPrimaryUuid) {
  declare onboardingStatus: OnboardingStatus

  @column({
    prepare: (value) => (value ? JSON.stringify(value) : value),
    consume: (value) => (typeof value === 'string' ? JSON.parse(value) : value),
  })
  declare openingHours: Array<{ startTime: string; endTime: string }>[]
}
