import { hasOne } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { UserSchema } from '#database/schema'
import Agenda from '#agendas/models/agenda'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(UserSchema, AuthFinder, WithPrimaryUuid) {
  get fullName() {
    return (this.firstName + ' ' + this.lastName).trim()
  }

  @hasOne(() => Agenda)
  declare agenda: HasOne<typeof Agenda>
}
