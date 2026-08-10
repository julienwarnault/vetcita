import { belongsTo } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { PrescriptionSchema } from '#database/schema'
import Tenant from '#tenants/models/tenant'
import Agenda from '#agendas/models/agenda'
import Pet from '#pets/models/pet'

export default class Prescription extends compose(PrescriptionSchema, WithPrimaryUuid) {
  @belongsTo(() => Pet)
  declare pet: BelongsTo<typeof Pet>

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => Agenda)
  declare agenda: BelongsTo<typeof Agenda>
}
