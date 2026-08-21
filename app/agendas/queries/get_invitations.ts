import { DateTime } from 'luxon'
import Invitation from '#agendas/models/invitation'
import type { UUID } from '#shared/types'

interface GetInvitationsParams {
  tenantId: UUID
}

export class GetInvitations {
  async execute(params: GetInvitationsParams) {
    const invitations = await Invitation.query()
      .where('tenant_id', params.tenantId)
      .where('expiresAt', '>', DateTime.now().toSQL()!)
      .where('status', 'pending')
      .whereNull('accepted_at')
      .preload('agenda')

    return { invitations }
  }
}
