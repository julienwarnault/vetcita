import { transactionContext } from '#shared/contexts/transaction_context'
import Service from '#services/models/service'
import type { UUID } from '#shared/types'

interface DeleteServiceParams {
  id: UUID
}

export class DeleteService {
  async execute(params: DeleteServiceParams) {
    const trx = transactionContext.get()

    const service = await Service.findOrFail(params.id, { client: trx })

    await service.delete()
  }
}
