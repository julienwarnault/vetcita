import { compose } from '@adonisjs/core/helpers'
import { slugify } from '@adonisjs/lucid-slugify'
import { attachment } from '@jrmc/adonis-attachment'
import { column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { LocationSchema } from '#database/schema'
import Species from '#pets/models/species'

export default class Location extends compose(LocationSchema, WithPrimaryUuid) {
  @slugify({ strategy: 'shortId', fields: ['name'], allowUpdates: true })
  declare slug: string

  @column({
    prepare: (value) => (value ? JSON.stringify(value) : value),
    consume: (value) => (typeof value === 'string' ? JSON.parse(value) : value),
  })
  declare openingHours: Array<{ startTime: string; endTime: string }>[]

  @attachment({ disk: 'r2', folder: 'uploads/locations' })
  declare logo: Attachment | null

  @attachment({ disk: 'r2', folder: 'uploads/locations' })
  declare cover: Attachment | null

  @manyToMany(() => Species, { pivotTimestamps: true })
  declare species: ManyToMany<typeof Species>
}
