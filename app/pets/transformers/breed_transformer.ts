import { BaseTransformer } from '@adonisjs/core/transformers'
import SpeciesTransformer from '#pets/transformers/species_transformer'
import type Breed from '#pets/models/breed'

export default class BreedTransformer extends BaseTransformer<Breed> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'name', 'speciesId']),
      species: SpeciesTransformer.transform(this.whenLoaded(this.resource.species)),
    }
  }
}
