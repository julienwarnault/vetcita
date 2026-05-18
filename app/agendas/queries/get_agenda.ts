import type { UUID } from '#app/shared/types'
import Agenda from '#agendas/models/agenda'

interface GetAgendaParams {
  id: UUID
}

export class GetAgenda {
  async execute(params: GetAgendaParams) {
    const agenda = await Agenda.findOrFail(params.id)

    return { agenda }
  }
}
