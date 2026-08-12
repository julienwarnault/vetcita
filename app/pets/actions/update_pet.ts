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
  isNeutered?: boolean
  breed?: string
  color?: string
  weight?: number
  bloodType?: string
  allergies?: string
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
      breed: params.breed || null,
      dateOfBirth: params.dateOfBirth,
      gender: params.gender || null,
      isNeutered: params.isNeutered ?? false,
      color: params.color || null,
      weight: params.weight || null,
      bloodType: params.bloodType || null,
      allergies: params.allergies || null,
      notes: params.notes || null,
    })

    await pet.useTransaction(trx!).save()

    return { pet }
  }
}
