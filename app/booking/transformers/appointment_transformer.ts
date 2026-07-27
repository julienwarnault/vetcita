import { BaseTransformer } from '@adonisjs/core/transformers'
import AppointmentStatusTransformer from '#appointment_workflow/transformers/appointment_status_transformer'
import ServiceTransformer from '#services/transformers/service_transformer'
import ClientTransformer from '#clients/transformers/client_transformer'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import PetTransformer from '#pets/transformers/pet_transformer'
import type Appointment from '#booking/models/appointment'

export default class AppointmentTransformer extends BaseTransformer<Appointment> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'startDate',
        'localStartDate',
        'endDate',
        'localEndDate',
        'serviceId',
        'clientId',
        'petId',
        'agendaId',
        'statusId',
        'duration',
        'bookingRef',
        'createdAt',
        'updatedAt',
      ]),
      service: ServiceTransformer.transform(this.whenLoaded(this.resource.service)),
      client: ClientTransformer.transform(this.whenLoaded(this.resource.client)),
      pet: PetTransformer.transform(this.whenLoaded(this.resource.pet))?.depth(2),
      tenant: TenantTransformer.transform(this.whenLoaded(this.resource.tenant)),
      agenda: AgendaTransformer.transform(this.whenLoaded(this.resource.agenda)),
      status: AppointmentStatusTransformer.transform(this.whenLoaded(this.resource.status)),
    }
  }
}
