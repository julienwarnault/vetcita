import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { belongsTo, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { UserSchema } from '#database/schema'
import Tenant from '#tenants/models/tenant'
import Agenda from '#agendas/models/agenda'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(UserSchema, AuthFinder, WithPrimaryUuid) {
  @hasOne(() => Agenda)
  declare agenda: HasOne<typeof Agenda>

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>
}
