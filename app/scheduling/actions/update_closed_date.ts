import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import ClosedDate from '#scheduling/models/closed_date'
import type { UUID } from '#shared/types'

interface UpdateClosedDateParams {
  id: UUID
  start: DateTime
  end: DateTime
  description?: string
}

export class UpdateClosedDate {
  async execute(params: UpdateClosedDateParams) {
    const trx = transactionContext.get()

    const closedDate = await ClosedDate.findOrFail(params.id, { client: trx })

    await closedDate.merge({
      description: params.description ?? null,
      start: params.start,
      end: params.end,
    })

    await closedDate.useTransaction(trx!).save()

    return { closedDate }
  }
}
