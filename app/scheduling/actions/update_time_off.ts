import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import TimeOff from '#scheduling/models/time_off'
import type { UUID } from '#shared/types'

interface UpdateTimeOffParams {
  id: UUID
  start: DateTime
  end: DateTime
  startTime: string
  endTime: string
  type: string
  description?: string
  agendaId: UUID
}

export class UpdateTimeOff {
  async execute(params: UpdateTimeOffParams) {
    const trx = transactionContext.get()

    const timeOff = await TimeOff.findOrFail(params.id, { client: trx })

    await timeOff.merge({
      type: params.type,
      description: params.description ?? null,
      start: params.start,
      end: params.end,
      startTime: params.startTime,
      endTime: params.endTime,
      agendaId: params.agendaId,
    })

    await timeOff.useTransaction(trx!).save()

    return { timeOff }
  }
}
