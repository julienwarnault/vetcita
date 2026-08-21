import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import InvitationTransformer from '#agendas/transformers/invitation_transformer'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { GetInvitations } from '#agendas/queries/get_invitations'
import { GetAgendas } from '#agendas/queries/get_agendas'

@inject()
export default class ListAgendasController {
  constructor(
    private readonly getAgendas: GetAgendas,
    private readonly getInvitations: GetInvitations
  ) {}

  async render({ request, inertia, tenantId }: HttpContext) {
    const search = request.input('search', undefined)

    const [{ agendas }, { invitations }] = await Promise.all([
      this.getAgendas.execute({ tenantId, search }),
      this.getInvitations.execute({ tenantId }),
    ])

    return inertia.render('agendas/list', {
      agendas: AgendaTransformer.transform(agendas),
      invitations: InvitationTransformer.transform(invitations),
    })
  }
}
