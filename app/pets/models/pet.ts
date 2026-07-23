import { compose } from '@adonisjs/core/helpers'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { GenderLabels } from '#pets/enums/gender'
import Client from '#clients/models/client'
import { PetSchema } from '#database/schema'
import Tenant from '#tenants/models/tenant'
import Species from '#pets/models/species'
import Breed from '#pets/models/breed'

export default class Pet extends compose(PetSchema, WithPrimaryUuid) {
  @column()
  declare gender: 'male' | 'female' | 'unknown' | null

  get genderLabel() {
    return this.gender ? GenderLabels[this.gender] : null
  }

  @belongsTo(() => Species)
  declare species: BelongsTo<typeof Species>

  @belongsTo(() => Breed)
  declare breed: BelongsTo<typeof Breed>

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>
}
