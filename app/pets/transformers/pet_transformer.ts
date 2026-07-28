import { BaseTransformer } from '@adonisjs/core/transformers'
import ClientTransformer from '#clients/transformers/client_transformer'
import SpeciesTransformer from '#pets/transformers/species_transformer'
import type Pet from '#pets/models/pet'

export default class PetTransformer extends BaseTransformer<Pet> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'name',
        'gender',
        'genderLabel',
        'isNeutered',
        'dateOfBirth',
        'breed',
        'color',
        'weight',
        'bloodType',
        'allergies',
        'notes',
        'clientId',
        'speciesId',
        'createdAt',
        'updatedAt',
      ]),
      client: ClientTransformer.transform(this.whenLoaded(this.resource.owner)),
      species: SpeciesTransformer.transform(this.whenLoaded(this.resource.species)),
    }
  }
}
