import { BaseTransformer } from '@adonisjs/core/transformers'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import PetTransformer from '#pets/transformers/pet_transformer'
import type Vaccine from '#medical_records/models/vaccine'

export default class VaccineTransformer extends BaseTransformer<Vaccine> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'tenantId',
        'petId',
        'appointmentId',
        'name',
        'date',
        'nextDueDate',
        'batchNumber',
        'manufacturer',
        'notes',
        'createdAt',
        'updatedAt',
      ]),
      pet: PetTransformer.transform(this.whenLoaded(this.resource.pet)),
      appointment: AppointmentTransformer.transform(this.whenLoaded(this.resource.appointment)),
    }
  }
}
