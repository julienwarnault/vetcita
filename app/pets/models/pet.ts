import { compose } from '@adonisjs/core/helpers'
import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { Gender, getGenderLabel } from '#pets/enums/gender'
import { PetSchema } from '#database/schema'
import Client from '#clients/models/client'
import Tenant from '#tenants/models/tenant'
import Species from '#pets/models/species'

export default class Pet extends compose(PetSchema, WithPrimaryUuid) {
  @column()
  declare gender: Gender | null

  get genderLabel() {
    return this.gender ? getGenderLabel(this.gender) : null
  }

  @belongsTo(() => Species)
  declare species: BelongsTo<typeof Species>

  @belongsTo(() => Client, { foreignKey: 'clientId' })
  declare owner: BelongsTo<typeof Client>

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>
}
