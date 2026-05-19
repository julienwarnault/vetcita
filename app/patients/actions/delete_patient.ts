import { transactionContext } from '#app/shared/contexts/transaction_context'
import Patient from '#patients/models/patient'
import type { UUID } from '#app/shared/types'

interface DeletePatientParams {
  id: UUID
}

export class DeletePatient {
  async execute(params: DeletePatientParams) {
    const trx = transactionContext.get()

    const patient = await Patient.findOrFail(params.id, { client: trx })

    await patient.delete()
  }
}
