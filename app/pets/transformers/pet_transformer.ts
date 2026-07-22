import { BaseTransformer } from '@adonisjs/core/transformers'
import PatientTransformer from '#patients/transformers/patient_transformer'
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
        'patientId',
        'speciesId',
        'breedId',
        'createdAt',
        'updatedAt',
      ]),
      patient: PatientTransformer.transform(this.whenLoaded(this.resource.patient)),
      species: SpeciesTransformer.transform(this.whenLoaded(this.resource.species)),
      breed: BreedTransformer.transform(this.whenLoaded(this.resource.breed)),
    }
  }
}
