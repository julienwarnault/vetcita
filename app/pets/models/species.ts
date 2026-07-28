import { compose } from '@adonisjs/core/helpers'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { SpeciesSchema } from '#database/schema'

export default class Species extends compose(SpeciesSchema, WithPrimaryUuid) {}
