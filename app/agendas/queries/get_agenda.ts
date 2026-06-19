import Agenda from '#agendas/models/agenda'
import type { UUID } from '#shared/types'

interface GetAgendaParams {
  id: UUID
}

export class GetAgenda {
  async execute(params: GetAgendaParams) {
    const agenda = await Agenda.query().where('id', params.id).preload('appointmentTypes').firstOrFail()

    return { agenda }
  }
}
