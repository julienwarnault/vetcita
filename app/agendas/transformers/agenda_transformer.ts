import { BaseTransformer } from '@adonisjs/core/transformers'
import ServiceTransformer from '#services/transformers/service_transformer'
import type Agenda from '#agendas/models/agenda'

export default class AgendaTransformer extends BaseTransformer<Agenda> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'name', 'color', 'tenantId', 'createdAt', 'updatedAt']),
      services: ServiceTransformer.transform(this.whenLoaded(this.resource.services)),
    }
  }
}
