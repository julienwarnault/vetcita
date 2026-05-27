import { transactionContext } from '#app/shared/contexts/transaction_context'
import Patient from '#patients/models/patient'
import type { UUID } from '#app/shared/types'

interface FindOrCreatePatientParams {
  tenantId: UUID
  firstName: string
  lastName: string
  phone: string
  email?: string
}

export class FindOrCreatePatient {
  async handle(params: FindOrCreatePatientParams) {
    const trx = transactionContext.get()

    const existing = await Patient.query({ client: trx })
      .where('tenant_id', params.tenantId)
      .where('phone', params.phone)
      .first()

    if (existing) return existing

    return Patient.create(
      {
        tenantId: params.tenantId,
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email?.toLowerCase().trim() || null,
        phone: params.phone,
      },
      { client: trx }
    )
  }
}
