import { transactionContext } from '#shared/contexts/transaction_context'
import Patient from '#patients/models/patient'
import type { UUID } from '#shared/types'

interface CreatePatientParams {
  firstName: string
  lastName: string
  email?: string
  phone: string
  notes?: string
  tenantId: UUID
}

export class CreatePatient {
  async execute(params: CreatePatientParams) {
    const trx = transactionContext.get()

    const patient = await Patient.create(
      {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email?.toLowerCase().trim() || null,
        phone: params.phone,
        notes: params.notes || null,
        tenantId: params.tenantId,
      },
      { client: trx }
    )

    return { patient }
  }
}
