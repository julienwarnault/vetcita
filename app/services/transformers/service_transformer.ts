import { BaseTransformer } from '@adonisjs/core/transformers'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import type Service from '#services/models/service'

export default class ServiceTransformer extends BaseTransformer<Service> {
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
