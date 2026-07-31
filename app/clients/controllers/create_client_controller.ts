import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { withTransaction } from '#shared/utils/with_transaction'
import ClientTransformer from '#clients/transformers/client_transformer'
import { CreateClient } from '#clients/actions/create_client'

@inject()
export default class CreateClientController {
  static validator = vine.create(
    vine.object({
      firstName: vine.string(),
      lastName: vine.string(),
      email: vine.string().email().optional(),
      phone: vine.string().phone(),
      notes: vine.string().optional(),
    })
  )

  constructor(private readonly createClient: CreateClient) {}

  async render({ inertia, request }: HttpContext) {
    const name = request.input('name', undefined)

    return inertia.render('clients/form', {
      initialName: name,
    })
  }

  async execute({ request, response, tenantId, session, serialize }: HttpContext) {
    const payload = await request.validateUsing(CreateClientController.validator)

    const { client } = await withTransaction(() => {
      return this.createClient.execute({ ...payload, tenantId })
    })

    session.flash('clientId', client.id)
    session.flash('client', await serialize.withoutWrapping(ClientTransformer.transform(client)))

    return response.redirect().back()
  }
}
