import Prescription from '#medical_records/models/prescription'
import type { UUID } from '#shared/types'

interface GetPrescriptionParams {
  id: UUID
  tenantId: UUID
}

export class GetPrescription {
  async execute(params: GetPrescriptionParams) {
    const prescription = await Prescription.query()
      .where('id', params.id)
      .where('tenant_id', params.tenantId)
      .preload('pet')
      .preload('tenant')
      .firstOrFail()

    return { prescription }
  }
}
