import { BaseTransformer } from '@adonisjs/core/transformers'
import ClientTransformer from '#clients/transformers/client_transformer'
import SpeciesTransformer from '#pets/transformers/species_transformer'
import BreedTransformer from '#pets/transformers/breed_transformer'
import type Pet from '#pets/models/pet'

export default class PetTransformer extends BaseTransformer<Pet> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'name',
        'gender',
        'genderLabel',
        'dateOfBirth',
        'notes',
        'clientId',
        'speciesId',
        'breedId',
        'createdAt',
        'updatedAt',
      ]),
      client: ClientTransformer.transform(this.whenLoaded(this.resource.client)),
      species: SpeciesTransformer.transform(this.whenLoaded(this.resource.species)),
      breed: BreedTransformer.transform(this.whenLoaded(this.resource.breed)),
    }
  }
}
