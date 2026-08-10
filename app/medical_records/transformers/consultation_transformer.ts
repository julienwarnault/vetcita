import { BaseTransformer } from '@adonisjs/core/transformers'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import type Consultation from '#medical_records/models/consultation'
import PetTransformer from '#pets/transformers/pet_transformer'

export default class ConsultationTransformer extends BaseTransformer<Consultation> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'recordType',
        'weight',
        'temperature',
        'heartRate',
        'respiratoryRate',
        'visitReason',
        'symptoms',
        'diagnosis',
        'treatment',
        'prescription',
        'petId',
        'agendaId',
        'tenantId',
        'createdAt',
        'updatedAt',
      ]),
      date: this.resource.date.toFormat('yyyy-MM-dd'),
      pet: PetTransformer.transform(this.whenLoaded(this.resource.pet))?.depth(2),
      tenant: TenantTransformer.transform(this.whenLoaded(this.resource.tenant)),
      agenda: AgendaTransformer.transform(this.whenLoaded(this.resource.agenda)),
    }
  }
}
