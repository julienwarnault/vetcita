import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import type { UUID } from '#shared/types'
import Pet from '#pets/models/pet'

interface CreatePetParams {
  name: string
  patientId: UUID
  tenantId: UUID
  speciesId: UUID
  dateOfBirth?: DateTime
  gender?: 'male' | 'female' | 'unknown'
  breedId?: UUID
  notes?: string
}

export class CreatePet {
  async execute(params: CreatePetParams) {
    const trx = transactionContext.get()

    const pet = await Pet.create(
      {
        name: params.name,
        patientId: params.patientId,
        tenantId: params.tenantId,
        speciesId: params.speciesId,
        breedId: params.breedId || null,
        dateOfBirth: params.dateOfBirth,
        gender: params.gender || null,
        notes: params.notes || null,
      },
      { client: trx }
    )

    return { pet }
  }
}
