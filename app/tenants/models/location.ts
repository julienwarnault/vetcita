import { column } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { slugify } from '@adonisjs/lucid-slugify'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { LocationSchema } from '#database/schema'

export default class Location extends compose(LocationSchema, WithPrimaryUuid) {
  @slugify({ strategy: 'shortId', fields: ['name'], allowUpdates: true })
  declare slug: string

  @column({
    prepare: (value) => (value ? JSON.stringify(value) : value),
    consume: (value) => (typeof value === 'string' ? JSON.parse(value) : value),
  })
  declare openingHours: Array<{ startTime: string; endTime: string }>[]
}
