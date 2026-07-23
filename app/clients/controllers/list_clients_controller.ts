import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ClientTransformer from '#clients/transformers/client_transformer'
import { GetClients } from '#clients/queries/get_clients'

@inject()
export default class ListClientsController {
  constructor(private readonly getClients: GetClients) {}

  async render({ request, inertia, auth }: HttpContext) {
    const search = request.input('search', undefined)

    const user = auth.getUserOrFail()

    const { clients } = await this.getClients.execute({
      tenantId: user.tenantId,
      search,
    })

    return inertia.render('clients/list', {
      clients: ClientTransformer.transform(clients),
    })
  }

  async api({ request, serialize, auth }: HttpContext) {
    const search = request.input('search', undefined)

    const user = auth.getUserOrFail()

    const { clients } = await this.getClients.execute({
      tenantId: user.tenantId,
      search,
    })

    return serialize.withoutWrapping(ClientTransformer.transform(clients))
  }
}
