import { transactionContext } from '#shared/contexts/transaction_context'
import TimeOff from '#scheduling/models/time_off'
import type { UUID } from '#shared/types'

interface DeleteTimeOffParams {
  id: UUID
}

export class DeleteTimeOff {
  async execute(params: DeleteTimeOffParams) {
    const trx = transactionContext.get()

    const timeOff = await TimeOff.findOrFail(params.id, { client: trx })

    await timeOff.delete()
  }
}
