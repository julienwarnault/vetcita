import { transactionContext } from '#shared/contexts/transaction_context'
import Service from '#services/models/service'
import type { UUID } from '#shared/types'

interface CreateServiceParams {
  name: string
  color: string
  duration: number
  price?: number
  description?: string
  agendaIds?: UUID[]
  tenantId: UUID
}

export class CreateService {
  async execute(params: CreateServiceParams) {
    const trx = transactionContext.get()

    const service = await Service.create(
      {
        name: params.name,
        color: params.color,
        duration: params.duration,
        price: params.price,
        description: params.description,
        tenantId: params.tenantId,
      },
      { client: trx }
    )

    await service.related('agendas').sync(params.agendaIds || [], true, trx)

    return { service }
  }
}
