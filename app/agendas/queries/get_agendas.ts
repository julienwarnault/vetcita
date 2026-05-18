import type { UUID } from '#app/shared/types'
import Agenda from '#agendas/models/agenda'

interface GetAgendasParams {
  tenantId: UUID
  search?: string
}

export class GetAgendas {
  async execute(params: GetAgendasParams) {
    const query = Agenda.query().where('tenantId', params.tenantId)

    if (params.search) {
      query.where((q) => q.whereILike('name', `%${params.search}%`))
    }

    const agendas = await query

    return { agendas }
  }
}
