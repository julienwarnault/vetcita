import Consultation from '#medical_records/models/consultation'
import type { UUID } from '#shared/types'

interface GetPetConsultationsParams {
  tenantId: UUID
  petId: UUID
}

export class GetPetConsultations {
  async execute(params: GetPetConsultationsParams) {
    const consultations = await Consultation.query()
      .where('tenantId', params.tenantId)
      .where('petId', params.petId)
      .preload('agenda')
      .orderBy('createdAt', 'desc')

    return { consultations }
  }
}
