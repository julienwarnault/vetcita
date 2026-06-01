import { BaseTransformer } from '@adonisjs/core/transformers'
import type AppointmentType from '#appointment_types/models/appointment_type'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'

export default class AppointmentTypeTransformer extends BaseTransformer<AppointmentType> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'name',
        'color',
        'price',
        'duration',
        'description',
        'tenantId',
        'createdAt',
        'updatedAt',
      ]),
      agendas: AgendaTransformer.transform(this.whenLoaded(this.resource.agendas)),
    }
  }
}
