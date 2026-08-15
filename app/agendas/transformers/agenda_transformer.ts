import { BaseTransformer } from '@adonisjs/core/transformers'
import ServiceTransformer from '#services/transformers/service_transformer'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import type Agenda from '#agendas/models/agenda'

export default class AgendaTransformer extends BaseTransformer<Agenda> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'fullName',
        'firstName',
        'lastName',
        'phone',
        'email',
        'role',
        'color',
        'userId',
        'tenantId',
        'createdAt',
        'updatedAt',
      ]),
      tenant: TenantTransformer.transform(this.whenLoaded(this.resource.tenant)),
      services: ServiceTransformer.transform(this.whenLoaded(this.resource.services)),
    }
  }
}
