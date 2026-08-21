import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import Invitation from '#agendas/models/invitation'

interface GetInvitationParams {
  token: string
}

export class GetInvitation {
  async execute(params: GetInvitationParams) {
    const tokenHash = crypto.createHash('sha256').update(params.token).digest('hex')

    const invitation = await Invitation.query()
      .where('token', tokenHash)
      .where('expiresAt', '>', DateTime.now().toSQL()!)
      .where('status', 'pending')
      .whereNull('accepted_at')
      .preload('agenda')
      .preload('tenant', (q) => q.preload('location'))
      .firstOrFail()

    return { invitation }
  }
}
