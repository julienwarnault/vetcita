import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import Vaccine from '#medical_records/models/vaccine'
import type { UUID } from '#shared/types'

interface UpdateVaccineParams {
  id: UUID
  petId: UUID
  tenantId: UUID
  name: string
  date: DateTime
  nextDueDate?: DateTime
  batchNumber?: string
  manufacturer?: string
  notes?: string
}

export class UpdateVaccine {
  async execute(params: UpdateVaccineParams) {
    const trx = transactionContext.get()

    const vaccine = await Vaccine.query({ client: trx })
      .where('id', params.id)
      .where('tenant_id', params.tenantId)
      .where('petId', params.petId)
      .firstOrFail()
    const previousNextDueDate = vaccine.nextDueDate

    vaccine.merge({
      name: params.name,
      date: params.date,
      nextDueDate: params.nextDueDate ?? null,
      batchNumber: params.batchNumber || null,
      manufacturer: params.manufacturer || null,
      notes: params.notes || null,
    })

    if (vaccine.nextDueDate?.toISODate() !== previousNextDueDate?.toISODate()) {
      vaccine.reminderSentAt = null
    }

    await vaccine.useTransaction(trx!).save()

    return { vaccine }
  }
}
