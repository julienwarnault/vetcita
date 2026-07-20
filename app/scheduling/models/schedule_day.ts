import { compose } from '@adonisjs/core/helpers'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { ScheduleDaySchema } from '#database/schema'
import Tenant from '#tenants/models/tenant'
import Agenda from '#agendas/models/agenda'

export default class ScheduleDay extends compose(ScheduleDaySchema, WithPrimaryUuid) {
  @column({
    prepare: (value) => (value ? JSON.stringify(value) : value),
    consume: (value) => (typeof value === 'string' ? JSON.parse(value) : value),
  })
  declare shifts: Array<{ startTime: string; endTime: string }>

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => Agenda)
  declare agenda: BelongsTo<typeof Agenda>
}
