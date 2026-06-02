import { belongsTo } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#app/shared/mixins/with_primary_uuid'
import { type RecurringPeriod } from '#scheduling/enums/recurring_period'
import { WorkingHourSchema } from '#database/schema'
import Agenda from '#agendas/models/agenda'
import Tenant from '#tenants/models/tenant'

export default class WorkingHour extends compose(WorkingHourSchema, WithPrimaryUuid) {
  declare recurringPeriod: RecurringPeriod

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => Agenda)
  declare agenda: BelongsTo<typeof Agenda>
}
