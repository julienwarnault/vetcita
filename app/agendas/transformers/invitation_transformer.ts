import { BaseTransformer } from '@adonisjs/core/transformers'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import type Invitation from '#agendas/models/invitation'

export default class InvitationTransformer extends BaseTransformer<Invitation> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'email', 'status', 'agendaId', 'expiresAt', 'createdAt']),
      agenda: AgendaTransformer.transform(this.whenLoaded(this.resource.agenda)),
      tenant: TenantTransformer.transform(this.whenLoaded(this.resource.tenant)),
    }
  }
}
