import { belongsTo } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { WithPrimaryUuid } from '#app/shared/mixins/with_primary_uuid'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { AgendaSchema } from '#database/schema'
import Tenant from '#app/tenants/models/tenant'

export default class Agenda extends compose(AgendaSchema, WithPrimaryUuid) {
  static table = 'agendas'

  @belongsTo(() => Tenant)
  declare clinic: BelongsTo<typeof Tenant>
}
