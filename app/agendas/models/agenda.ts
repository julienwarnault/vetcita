import { compose } from '@adonisjs/core/helpers'
import { belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import WorkingHour from '#scheduling/models/working_hour'
import { AgendaSchema } from '#database/schema'
import Service from '#services/models/service'
import Tenant from '#tenants/models/tenant'

export type AgendaRole = 'owner' | 'staff' | 'none'

export default class Agenda extends compose(AgendaSchema, WithPrimaryUuid) {
  static table = 'agendas'

  declare role: AgendaRole

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @manyToMany(() => Service, { pivotTimestamps: true })
  declare services: ManyToMany<typeof Service>

  @hasMany(() => WorkingHour)
  declare workingHours: HasMany<typeof WorkingHour>
}
