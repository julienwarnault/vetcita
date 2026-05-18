import { BaseTransformer } from '@adonisjs/core/transformers'
import type Agenda from '#agendas/models/agenda'

export default class AgendaTransformer extends BaseTransformer<Agenda> {
  toObject() {
    return this.pick(this.resource, ['id', 'name', 'color', 'tenantId', 'createdAt', 'updatedAt'])
  }
}
