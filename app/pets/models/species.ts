import { hasMany } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { SpeciesSchema } from '#database/schema'
import Breed from '#pets/models/breed'

export default class Species extends compose(SpeciesSchema, WithPrimaryUuid) {
  @hasMany(() => Breed)
  declare breeds: HasMany<typeof Breed>
}
