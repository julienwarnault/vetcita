import Agenda from '#agendas/models/agenda'
import type { UUID } from '#shared/types'

interface GetAgendasParams {
  tenantId: UUID
  search?: string
}

export class GetAgendas {
  async execute(params: GetAgendasParams) {
    const query = Agenda.query().where('tenantId', params.tenantId).orderBy('first_name')

    if (params.search) {
      const term = `%${params.search}%`

      query.where((builder) => {
        builder
          .whereILike('phone', term)
          .orWhereILike('email', term)
          .orWhereRaw(`CONCAT(first_name, ' ', last_name) ILIKE ?`, [term])
          .orWhereRaw(`CONCAT(last_name, ' ', first_name) ILIKE ?`, [term])
      })
    }

    const agendas = await query

    return { agendas }
  }
}
