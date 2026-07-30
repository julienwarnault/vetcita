import { BaseTransformer } from '@adonisjs/core/transformers'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import type User from '#identity/models/user'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'fullName', 'email', 'tenantId', 'createdAt', 'updatedAt']),
      tenant: TenantTransformer.transform(this.whenLoaded(this.resource.tenant)),
      agenda: AgendaTransformer.transform(this.whenLoaded(this.resource.agenda)),
    }
  }
}
