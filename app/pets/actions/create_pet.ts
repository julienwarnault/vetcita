import type { DateTime } from 'luxon'
import { PetAlreadyExistsException } from '#pets/exceptions/pet_already_exists_exception'
import { transactionContext } from '#shared/contexts/transaction_context'
import type { Gender } from '#pets/enums/gender'
import type { UUID } from '#shared/types'
import Pet from '#pets/models/pet'

interface CreatePetParams {
  name: string
  clientId: UUID
  tenantId: UUID
  speciesId: UUID
  dateOfBirth?: DateTime
  gender?: Gender
  isNeutered?: boolean
  breed?: string
  color?: string
  weight?: number
  bloodType?: string
  allergies?: string
  notes?: string
}

export class CreatePet {
  async execute(params: CreatePetParams) {
    const trx = transactionContext.get()
    const name = params.name.trim()

    const existingPet = await Pet.query({ client: trx })
      .where('tenant_id', params.tenantId)
      .where('client_id', params.clientId)
      .whereILike('name', name)
      .first()

    if (existingPet) {
      throw new PetAlreadyExistsException()
    }

    const pet = await Pet.create(
      {
        name,
        clientId: params.clientId,
        tenantId: params.tenantId,
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
      },
      { client: trx }
    )

    return { pet }
  }
}
