import Patient from '#patients/models/patient'
import type { UUID } from '#shared/types'

interface GetPatientsParams {
  tenantId: UUID
  search?: string
}

export class GetPatients {
  async execute(params: GetPatientsParams) {
    const query = Patient.query().where('tenantId', params.tenantId)

    if (params.search) {
      const term = `%${params.search}%`

      query.where((builder) => {
        builder
          .whereILike('phone', term)
          .orWhereRaw(`CONCAT(first_name, ' ', last_name) ILIKE ?`, [term])
          .orWhereRaw(`CONCAT(last_name, ' ', first_name) ILIKE ?`, [term])
      })
    }

    const patients = await query

    return { patients }
  }
}
