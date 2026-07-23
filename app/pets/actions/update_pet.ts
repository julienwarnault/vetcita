import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import type { UUID } from '#shared/types'
import Pet from '#pets/models/pet'

interface UpdatePetParams {
  id: UUID
  name: string
  clientId: UUID
  speciesId: UUID
  dateOfBirth?: DateTime
  gender?: 'male' | 'female' | 'unknown'
  breedId?: UUID
  notes?: string
}

export class UpdatePet {
  async execute(params: UpdatePetParams) {
    const trx = transactionContext.get()

    const pet = await Pet.findOrFail(params.id, { client: trx })

    pet.merge({
      name: params.name,
      clientId: params.clientId,
      speciesId: params.speciesId,
      breedId: params.breedId || null,
      dateOfBirth: params.dateOfBirth,
      gender: params.gender || null,
      notes: params.notes || null,
    })

    await pet.save()

    return { pet }
  }
}
