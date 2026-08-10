import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import Prescription from '#medical_records/models/prescription'
import type { UUID } from '#shared/types'

interface CreatePrescriptionParams {
  petId: UUID
  agendaId: UUID
  tenantId: UUID
  name: string
  notes?: string
  type: string
  date: DateTime
  intervalDays?: number
}

export class CreatePrescription {
  async execute(params: CreatePrescriptionParams) {
    const trx = transactionContext.get()

    const prescription = await Prescription.create(
      {
        tenantId: params.tenantId,
        agendaId: params.agendaId ?? null,
        petId: params.petId,
        name: params.name,
        notes: params.notes,
        type: params.type,
        date: params.date,
        intervalDays: params.intervalDays,
      },
      { client: trx }
    )

    return { prescription }
  }
}
