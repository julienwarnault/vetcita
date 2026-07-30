import Vaccine from '#medical_records/models/vaccine'
import type { UUID } from '#shared/types'

interface GetVaccineParams {
  id: UUID
  tenantId: UUID
}

export class GetVaccine {
  async execute(params: GetVaccineParams) {
    const vaccine = await Vaccine.query()
      .where('id', params.id)
      .where('tenant_id', params.tenantId)
      .preload('pet')
      .preload('tenant')
      .firstOrFail()

    return { vaccine }
  }
}
