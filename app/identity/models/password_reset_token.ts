import { belongsTo } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { PasswordResetTokenSchema } from '#database/schema'
import User from '#identity/models/user'

export default class PasswordResetToken extends compose(PasswordResetTokenSchema, WithPrimaryUuid) {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
