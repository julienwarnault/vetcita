import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import Vaccine from '#medical_records/models/vaccine'
import type { UUID } from '#shared/types'

interface CreateVaccineParams {
  petId: UUID
  agendaId?: UUID
  tenantId: UUID
  name: string
  date: DateTime
  nextDueDate?: DateTime
  batchNumber?: string
  manufacturer?: string
  notes?: string
}

export class CreateVaccine {
  async execute(params: CreateVaccineParams) {
    const trx = transactionContext.get()

    const vaccine = await Vaccine.create(
      {
        tenantId: params.tenantId,
        petId: params.petId,
        agendaId: params.agendaId ?? null,
        name: params.name,
        date: params.date,
        nextDueDate: params.nextDueDate,
        batchNumber: params.batchNumber,
        manufacturer: params.manufacturer,
        notes: params.notes,
      },
      { client: trx }
    )

    return { vaccine }
  }
}
