import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { AgendaDeletionNotAllowedException } from '#agendas/exceptions/agenda_deletion_not_allowed_exception'
import { withTransaction } from '#shared/utils/with_transaction'
import { DeleteAgenda } from '#agendas/actions/delete_agenda'

@inject()
export default class DeleteAgendaController {
  constructor(private readonly deleteAgenda: DeleteAgenda) {}

  async execute({ params, response, agenda }: HttpContext) {
    if (params.id === agenda.id) {
      throw new AgendaDeletionNotAllowedException()
    }

    await withTransaction(() => {
      return this.deleteAgenda.execute({ id: params.id })
    })

    return response.redirect().back()
  }
}
