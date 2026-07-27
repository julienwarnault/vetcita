import { transactionContext } from '#shared/contexts/transaction_context'
import Service from '#services/models/service'
import type { UUID } from '#shared/types'

interface UpdateServiceParams {
  id: UUID
  name: string
  color: string
  duration: number
  price?: number
  description?: string
  agendaIds?: UUID[]
}

export class UpdateService {
  async execute(params: UpdateServiceParams) {
    const trx = transactionContext.get()

    const service = await Service.findOrFail(params.id, { client: trx })

    service.merge({
      name: params.name,
      color: params.color,
      duration: params.duration,
      price: params.price,
      description: params.description,
    })

    await service.useTransaction(trx!).save()

    await service.related('agendas').sync(params.agendaIds || [], true, trx)

    return { service }
  }
}
