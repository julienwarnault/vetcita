import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ClientTransformer from '#clients/transformers/client_transformer'
import { withTransaction } from '#shared/utils/with_transaction'
import { UpdateClient } from '#clients/actions/update_client'
import { GetClient } from '#clients/queries/get_client'

@inject()
export default class UpdateClientController {
  static validator = vine.create(
    vine.object({
      firstName: vine.string(),
      lastName: vine.string(),
      email: vine.string().email().optional(),
      phone: vine.string().phone(),
      notes: vine.string().optional(),
    })
  )

  constructor(
    private readonly getClient: GetClient,
    private readonly updateClient: UpdateClient
  ) {}

  async render({ inertia, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { client } = await this.getClient.execute({ id: params.id, tenantId: user.tenantId })

    return inertia.render('clients/form', {
      client: ClientTransformer.transform(client),
    })
  }

  async execute({ request, params, response, auth }: HttpContext) {
    const payload = await request.validateUsing(UpdateClientController.validator)
    const user = auth.getUserOrFail()

    await withTransaction(() => {
      return this.updateClient.execute({ id: params.id, tenantId: user.tenantId, ...payload })
    })

    return response.redirect().back()
  }
}
