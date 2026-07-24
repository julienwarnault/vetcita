import { transactionContext } from '#shared/contexts/transaction_context'
import type { UUID } from '#shared/types'
import Pet from '#pets/models/pet'

interface FindOrUpdatePetParams {
  tenantId: UUID
  clientId: UUID
  speciesId: UUID
  name: string
}

export class FindOrUpdatePet {
  async handle(params: FindOrUpdatePetParams) {
    const trx = transactionContext.get()

    const pet = await Pet.updateOrCreate(
      { clientId: params.clientId, name: params.name, tenantId: params.tenantId },
      {
        tenantId: params.tenantId,
        clientId: params.clientId,
        name: params.name,
        speciesId: params.speciesId,
      },
      {
        client: trx,
      }
    )

    return { pet }
  }
}
