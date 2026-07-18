import { transactionContext } from '#shared/contexts/transaction_context'
import ClosedDate from '#scheduling/models/closed_date'
import type { UUID } from '#shared/types'

interface DeleteClosedDateParams {
  id: UUID
}

export class DeleteClosedDate {
  async execute(params: DeleteClosedDateParams) {
    const trx = transactionContext.get()

    const closedDate = await ClosedDate.findOrFail(params.id, { client: trx })

    await closedDate.delete()
  }
}
