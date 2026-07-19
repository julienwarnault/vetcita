import Agenda from '#agendas/models/agenda'
import type { UUID } from '#shared/types'

interface GetAgendasParams {
  tenantId: UUID
  search?: string
}

export class GetAgendas {
  async execute(params: GetAgendasParams) {
    const query = Agenda.query().where('tenantId', params.tenantId).orderBy('name')

    if (params.search) {
      query.where((q) => q.whereILike('name', `%${params.search}%`))
    }

    const agendas = await query

    return { agendas }
  }
}
