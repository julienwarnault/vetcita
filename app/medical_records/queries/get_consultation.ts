import Consultation from '#medical_records/models/consultation'
import type { UUID } from '#shared/types'

interface GetConsultationParams {
  id: UUID
  tenantId: UUID
}

export class GetConsultation {
  async execute(params: GetConsultationParams) {
    const consultation = await Consultation.query()
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    return { consultation }
  }
}
