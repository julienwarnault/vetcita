import type { DateTime } from 'luxon'
import { PetAlreadyExistsException } from '#pets/exceptions/pet_already_exists_exception'
import { transactionContext } from '#shared/contexts/transaction_context'
import type { Gender } from '#pets/enums/gender'
import type { UUID } from '#shared/types'
import Pet from '#pets/models/pet'

interface UpdatePetParams {
  id: UUID
  tenantId: UUID
  name: string
  clientId: UUID
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

export class UpdatePet {
  async execute(params: UpdatePetParams) {
    const trx = transactionContext.get()
    const name = params.name.trim()

    const pet = await Pet.query({ client: trx })
      .where('id', params.id)
      .where('tenant_id', params.tenantId)
      .firstOrFail()

    const existingPet = await Pet.query({ client: trx })
      .where('tenant_id', params.tenantId)
      .where('client_id', params.clientId)
      .whereILike('name', name)
      .whereNot('id', pet.id)
      .first()

    if (existingPet) {
      throw new PetAlreadyExistsException()
    }

    pet.merge({
      name,
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
