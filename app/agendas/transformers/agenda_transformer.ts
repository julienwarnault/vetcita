import { BaseTransformer } from '@adonisjs/core/transformers'
import AppointmentTypeTransformer from '#appointment_types/transformers/appointment_type_transformer'
import type Agenda from '#agendas/models/agenda'

export default class AgendaTransformer extends BaseTransformer<Agenda> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'name', 'color', 'tenantId', 'createdAt', 'updatedAt']),
      appointmentTypes: AppointmentTypeTransformer.transform(this.whenLoaded(this.resource.appointmentTypes)),
    }
  }
}
