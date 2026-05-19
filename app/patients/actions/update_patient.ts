import { transactionContext } from '#app/shared/contexts/transaction_context'
import Patient from '#patients/models/patient'
import type { UUID } from '#app/shared/types'

interface UpdatePatientParams {
  id: UUID
  firstName: string
  lastName: string
  email?: string
  phone: string
  notes?: string
}

export class UpdatePatient {
  async execute(params: UpdatePatientParams) {
    const trx = transactionContext.get()

    const patient = await Patient.findOrFail(params.id, { client: trx })

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
