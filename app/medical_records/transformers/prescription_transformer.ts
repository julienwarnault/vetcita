import { BaseTransformer } from '@adonisjs/core/transformers'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import type Prescription from '#medical_records/models/prescription'
import PetTransformer from '#pets/transformers/pet_transformer'

export default class PrescriptionTransformer extends BaseTransformer<Prescription> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'tenantId',
        'petId',
        'agendaId',
        'name',
        'notes',
        'type',
        'intervalDays',
        'createdAt',
        'updatedAt',
      ]),
      date: this.resource.date.toFormat('yyyy-MM-dd'),
      pet: PetTransformer.transform(this.whenLoaded(this.resource.pet)),
      agenda: AgendaTransformer.transform(this.whenLoaded(this.resource.agenda)),
    }
  }
}
