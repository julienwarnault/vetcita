import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { withTransaction } from '#shared/utils/with_transaction'
import { DeleteAgenda } from '#agendas/actions/delete_agenda'

@inject()
export default class DeleteAgendaController {
  constructor(private readonly deleteAgenda: DeleteAgenda) {}

  async execute({ params, response }: HttpContext) {
    await withTransaction(() => {
      return this.deleteAgenda.execute({ id: params.id })
    })

    return response.noContent()
  }
}
