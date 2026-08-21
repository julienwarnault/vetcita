import { compose } from '@adonisjs/core/helpers'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { InvitationSchema } from '#database/schema'
import Tenant from '#tenants/models/tenant'
import Agenda from '#agendas/models/agenda'

export type InvitationStatus = 'pending' | 'accepted' | 'revoked' | 'expired'

export default class Invitation extends compose(InvitationSchema, WithPrimaryUuid) {
  @column()
  declare status: InvitationStatus

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => Agenda)
  declare agenda: BelongsTo<typeof Agenda>
}
