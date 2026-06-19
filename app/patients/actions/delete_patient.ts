import { transactionContext } from '#shared/contexts/transaction_context'
import Patient from '#patients/models/patient'
import type { UUID } from '#shared/types'

interface DeletePatientParams {
  id: UUID
  tenantId: UUID
}

export class DeletePatient {
  async execute(params: DeletePatientParams) {
    const trx = transactionContext.get()

    const patient = await Patient.query({ client: trx })
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    await patient.delete()
  }
}
