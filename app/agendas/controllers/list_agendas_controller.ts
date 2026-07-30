import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { GetAgendas } from '#agendas/queries/get_agendas'

@inject()
export default class ListAgendasController {
  constructor(private readonly getAgendas: GetAgendas) {}

  async render({ request, inertia, tenantId }: HttpContext) {
    const search = request.input('search', undefined)

    const { agendas } = await this.getAgendas.execute({ tenantId, search })

    return inertia.render('agendas/list', {
      agendas: AgendaTransformer.transform(agendas),
    })
  }
}
