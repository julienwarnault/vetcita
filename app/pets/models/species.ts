import { manyToMany } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { SpeciesSchema } from '#database/schema'
import Location from '#tenants/models/location'

export default class Species extends compose(SpeciesSchema, WithPrimaryUuid) {
  @manyToMany(() => Location, { pivotTimestamps: true })
  declare locations: ManyToMany<typeof Location>
}
