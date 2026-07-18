import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import ClosedDate from '#scheduling/models/closed_date'
import type { UUID } from '#shared/types'

interface CreateClosedDateParams {
  start: DateTime
  end: DateTime
  description?: string
  tenantId: UUID
}

export class CreateClosedDate {
  async execute(params: CreateClosedDateParams) {
    const trx = transactionContext.get()

    const closedDate = await ClosedDate.create(
      {
        description: params.description,
        start: params.start,
        end: params.end,
        tenantId: params.tenantId,
      },
      { client: trx }
    )

    return { closedDate }
  }
}
