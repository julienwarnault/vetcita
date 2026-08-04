import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import Prescription from '#medical_records/models/prescription'
import type { UUID } from '#shared/types'

interface UpdatePrescriptionParams {
  id: UUID
  tenantId: UUID
  petId: UUID
  name: string
  notes?: string
  type: string
  date: DateTime
  intervalDays?: number
}

export class UpdatePrescription {
  async execute(params: UpdatePrescriptionParams) {
    const trx = transactionContext.get()

    const prescription = await Prescription.query({ client: trx })
      .where('id', params.id)
      .where('tenant_id', params.tenantId)
      .where('petId', params.petId)
      .firstOrFail()

    prescription.merge({
      name: params.name,
      notes: params.notes || null,
      type: params.type,
      date: params.date,
      intervalDays: params.intervalDays ?? null,
    })

    await prescription.useTransaction(trx!).save()

    return { prescription }
  }
}
