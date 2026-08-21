import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { SendInvitation } from '#agendas/actions/send_invitation'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class SendInvitationController {
  constructor(private readonly sendInvitation: SendInvitation) {}

  async execute({ params, response, session, tenantId, auth }: HttpContext) {
    await withTransaction(() => {
      return this.sendInvitation.execute({ agendaId: params.id, tenantId, invitedByUserId: auth.user!.id })
    })

    session.flash('success', 'Invitación enviada correctamente.')

    return response.redirect().back()
  }
}
