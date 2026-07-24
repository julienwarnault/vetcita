import { BaseTransformer } from '@adonisjs/core/transformers'
import type Species from '#pets/models/species'

export default class SpeciesTransformer extends BaseTransformer<Species> {
  toObject() {
    return this.pick(this.resource, ['id', 'name', 'illustrationUrl'])
  }
}
