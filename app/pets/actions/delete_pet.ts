import { transactionContext } from '#shared/contexts/transaction_context'
import type { UUID } from '#shared/types'
import Pet from '#pets/models/pet'

interface DeletePetParams {
  id: UUID
}

export class DeletePet {
  async execute(params: DeletePetParams) {
    const trx = transactionContext.get()

    const pet = await Pet.findOrFail(params.id, { client: trx })

    await pet.delete()
  }
}
