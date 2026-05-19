import Patient from '#patients/models/patient'
import type { UUID } from '#app/shared/types'

interface GetPatientParams {
  id: UUID
}

export class GetPatient {
  async execute(params: GetPatientParams) {
    const patient = await Patient.findOrFail(params.id)

    return { patient }
  }
}
