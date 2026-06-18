import { belongsTo } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { AppointmentStatusSchema } from '#database/schema'
import Tenant from '#tenants/models/tenant'

export default class AppointmentStatus extends compose(AppointmentStatusSchema, WithPrimaryUuid) {
  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>
}
