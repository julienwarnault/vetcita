import Prescription from '#medical_records/models/prescription'
import type { UUID } from '#shared/types'

interface GetPetPrescriptionsParams {
  tenantId: UUID
  petId: UUID
}

export class GetPetPrescriptions {
  async execute(params: GetPetPrescriptionsParams) {
    const prescriptions = await Prescription.query()
      .where('tenant_id', params.tenantId)
      .where('pet_id', params.petId)
      .orderBy('date', 'desc')

    return { prescriptions }
  }
}
