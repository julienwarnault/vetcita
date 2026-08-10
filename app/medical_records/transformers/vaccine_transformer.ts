import { BaseTransformer } from '@adonisjs/core/transformers'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import PetTransformer from '#pets/transformers/pet_transformer'
import type Vaccine from '#medical_records/models/vaccine'

export default class VaccineTransformer extends BaseTransformer<Vaccine> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'tenantId',
        'petId',
        'agendaId',
        'name',
        'nextDueDate',
        'reminderSentAt',
        'batchNumber',
        'manufacturer',
        'notes',
        'createdAt',
        'updatedAt',
      ]),
      date: this.resource.date.toFormat('yyyy-MM-dd'),
      nextDueDate: this.resource.nextDueDate?.toFormat('yyyy-MM-dd'),
      pet: PetTransformer.transform(this.whenLoaded(this.resource.pet)),
      agenda: AgendaTransformer.transform(this.whenLoaded(this.resource.agenda)),
    }
  }
}
