import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { withTransaction } from '#app/shared/utils/with_transaction'
import { CreateAgenda } from '#agendas/actions/create_agenda'

@inject()
export default class CreateAgendaController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      color: vine.string(),
    })
  )

  constructor(private readonly createAgenda: CreateAgenda) {}

  async render({ inertia }: HttpContext) {
    return inertia.render('agendas/form', {})
  }

  async execute({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(CreateAgendaController.validator)

    const user = auth.getUserOrFail()

    await withTransaction(() => {
      return this.createAgenda.execute({ ...payload, tenantId: user.tenantId })
    })

    return response.redirect().toRoute('list_agendas.render')
  }
}
