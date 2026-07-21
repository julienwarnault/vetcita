import { belongsTo } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { BreedSchema } from '#database/schema'
import Species from '#pets/models/species'

export default class Breed extends compose(BreedSchema, WithPrimaryUuid) {
  @belongsTo(() => Species)
  declare species: BelongsTo<typeof Species>
}
