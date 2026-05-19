import { belongsTo } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { WithPrimaryUuid } from '#app/shared/mixins/with_primary_uuid'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { AppointmentTypeSchema } from '#database/schema'
import Tenant from '#app/tenants/models/tenant'

export default class AppointmentType extends compose(AppointmentTypeSchema, WithPrimaryUuid) {
  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>
}
