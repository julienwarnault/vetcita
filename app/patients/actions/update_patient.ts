import { transactionContext } from '#shared/contexts/transaction_context'
import Patient from '#patients/models/patient'
import type { UUID } from '#shared/types'

interface UpdatePatientParams {
  id: UUID
  tenantId: UUID
  firstName: string
  lastName: string
  email?: string
  phone: string
  notes?: string
}

export class UpdatePatient {
  async execute(params: UpdatePatientParams) {
    const trx = transactionContext.get()

    const patient = await Patient.query({ client: trx })
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    patient.merge({
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email?.toLowerCase().trim() || null,
      phone: params.phone,
      notes: params.notes || null,
    })

    await patient.save()

    return { patient }
  }
}
