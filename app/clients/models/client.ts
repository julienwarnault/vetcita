import Pet from '#app/pets/models/pet'
import { hasMany } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { ClientSchema } from '#database/schema'

export default class Client extends compose(ClientSchema, WithPrimaryUuid) {
  get fullName() {
    return this.firstName + ' ' + this.lastName
  }

  @hasMany(() => Pet)
  declare pets: HasMany<typeof Pet>
}
