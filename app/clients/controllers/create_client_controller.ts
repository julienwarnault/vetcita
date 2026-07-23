import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { withTransaction } from '#shared/utils/with_transaction'
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

  async render({ inertia }: HttpContext) {
    return inertia.render('clients/form', {})
  }

  async execute({ request, response, auth, session }: HttpContext) {
    const payload = await request.validateUsing(CreateClientController.validator)

    const user = auth.getUserOrFail()

    const { client } = await withTransaction(() => {
      return this.createClient.execute({ ...payload, tenantId: user.tenantId })
    })

    session.flash('clientId', client.id)

    return response.redirect().back()
  }
}
