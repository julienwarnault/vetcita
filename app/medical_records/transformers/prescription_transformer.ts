import { BaseTransformer } from '@adonisjs/core/transformers'
import type Prescription from '#medical_records/models/prescription'
import PetTransformer from '#pets/transformers/pet_transformer'

export default class PrescriptionTransformer extends BaseTransformer<Prescription> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'tenantId',
        'petId',
        'name',
        'notes',
        'type',
        'date',
        'intervalDays',
        'createdAt',
        'updatedAt',
      ]),
      pet: PetTransformer.transform(this.whenLoaded(this.resource.pet)),
    }
  }
}
