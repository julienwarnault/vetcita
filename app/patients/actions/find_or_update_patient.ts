import { transactionContext } from '#app/shared/contexts/transaction_context'
import Patient from '#patients/models/patient'
import type { UUID } from '#app/shared/types'

interface FindOrUpdatePatientParams {
  tenantId: UUID
  firstName: string
  lastName: string
  phone: string
  email?: string
}

export class FindOrUpdatePatient {
  async handle(params: FindOrUpdatePatientParams) {
    const trx = transactionContext.get()

    return Patient.updateOrCreate(
      { phone: params.phone, tenantId: params.tenantId },
      {
        tenantId: params.tenantId,
        firstName: params.firstName?.toUpperCase().trim(),
        lastName: params.lastName,
        phone: params.phone,
        email: params.email?.toLowerCase().trim() || null,
      },
      {
        client: trx,
      }
    )
  }
}
