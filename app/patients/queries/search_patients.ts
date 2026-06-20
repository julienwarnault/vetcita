import Patient from '#patients/models/patient'
import type { UUID } from '#shared/types'

interface SearchPatientsParams {
  tenantId: UUID
  search?: string
  limit: number
}

export class SearchPatients {
  async execute(params: SearchPatientsParams) {
    const query = Patient.query().where('tenant_id', params.tenantId).orderBy('created_at', 'desc').limit(params.limit)

    if (params.search) {
      const term = `%${params.search}%`

      query.where((builder) => {
        builder
          .whereILike('phone', term)
          .orWhereILike('email', term)
          .orWhereRaw(`CONCAT(first_name, ' ', last_name) ILIKE ?`, [term])
          .orWhereRaw(`CONCAT(last_name, ' ', first_name) ILIKE ?`, [term])
      })
    }

    const patients = await query

    return { patients }
  }
}
