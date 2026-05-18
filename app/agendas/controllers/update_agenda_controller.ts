import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { withTransaction } from '#app/shared/utils/with_transaction'
import { UpdateAgenda } from '#agendas/actions/update_agenda'
import { GetAgenda } from '#agendas/queries/get_agenda'

@inject()
export default class UpdateAgendaController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      color: vine.string(),
    })
  )

  constructor(
    private readonly getAgenda: GetAgenda,
    private readonly updateAgenda: UpdateAgenda
  ) {}

  async render({ inertia, params }: HttpContext) {
    const { agenda } = await this.getAgenda.execute({ id: params.id })

    return inertia.render('agendas/form', {
      agenda: AgendaTransformer.transform(agenda),
    })
  }

  async execute({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(UpdateAgendaController.validator)

    await withTransaction(() => {
      return this.updateAgenda.execute({ id: params.id, ...payload })
    })

    return response.redirect().toRoute('list_agendas.render')
  }
}
