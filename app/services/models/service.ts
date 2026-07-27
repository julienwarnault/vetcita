import { compose } from '@adonisjs/core/helpers'
import { belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { ServiceSchema } from '#database/schema'
import Tenant from '#tenants/models/tenant'
import Agenda from '#agendas/models/agenda'

export default class Service extends compose(ServiceSchema, WithPrimaryUuid) {
  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @manyToMany(() => Agenda, { pivotTimestamps: true })
  declare agendas: ManyToMany<typeof Agenda>
}
