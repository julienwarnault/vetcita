import Patient from '#patients/models/patient'
import type { UUID } from '#app/shared/types'

interface GetPatientParams {
  id: UUID
  tenantId: UUID
}

export class GetPatient {
  async execute(params: GetPatientParams) {
    const patient = await Patient.query().where('id', params.id).where('tenantId', params.tenantId).firstOrFail()

    return { patient }
  }
}
