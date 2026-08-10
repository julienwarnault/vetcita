import Consultation from '#medical_records/models/consultation'
import type { UUID } from '#shared/types'

interface GetConsultationsParams {
  tenantId: UUID
  search?: string
}

export class GetConsultations {
  async execute(params: GetConsultationsParams) {
    const query = Consultation.query()
      .where('tenant_id', params.tenantId)
      .preload('pet', (q) => q.preload('owner'))
      .preload('agenda')
      .orderBy('date', 'desc')
      .orderBy('createdAt', 'desc')

    if (params.search) {
      const term = `%${params.search}%`

      query.where((builder) => {
        builder
          .whereILike('recordType', term)
          .orWhereILike('diagnosis', term)
          .orWhereHas('pet', (q) => q.whereILike('name', term))
      })
    }

    const consultations = await query

    return { consultations }
  }
}
