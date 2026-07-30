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

  async render({ inertia, params, tenantId }: HttpContext) {
    const { client } = await this.getClient.execute({ id: params.id, tenantId })

    return inertia.render('clients/form', {
      client: ClientTransformer.transform(client),
    })
  }

  async execute({ request, params, response, tenantId }: HttpContext) {
    const payload = await request.validateUsing(UpdateClientController.validator)
    await withTransaction(() => {
      return this.updateClient.execute({ id: params.id, tenantId, ...payload })
    })

    return response.redirect().back()
  }
}
