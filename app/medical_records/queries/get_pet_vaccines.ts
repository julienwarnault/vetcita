import Vaccine from '#medical_records/models/vaccine'
import type { UUID } from '#shared/types'

interface GetPetVaccinesParams {
  tenantId: UUID
  petId: UUID
}

export class GetPetVaccines {
  async execute(params: GetPetVaccinesParams) {
    const vaccines = await Vaccine.query()
      .where('tenant_id', params.tenantId)
      .where('pet_id', params.petId)
      .orderBy('date', 'desc')

    return { vaccines }
  }
}
