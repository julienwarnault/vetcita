import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import TimeOff from '#scheduling/models/time_off'
import type { UUID } from '#shared/types'

interface CreateTimeOffParams {
  start: DateTime
  end: DateTime
  startTime: string
  endTime: string
  type: string
  description?: string
  agendaId: UUID
  tenantId: UUID
}

export class CreateTimeOff {
  async execute(params: CreateTimeOffParams) {
    const trx = transactionContext.get()

    const timeOff = await TimeOff.create(
      {
        type: params.type,
        description: params.description,
        start: params.start,
        end: params.end,
        startTime: params.startTime,
        endTime: params.endTime,
        agendaId: params.agendaId,
        tenantId: params.tenantId,
      },
      { client: trx }
    )

    return { timeOff }
  }
}
