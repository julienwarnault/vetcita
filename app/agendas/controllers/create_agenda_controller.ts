import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ServiceTransformer from '#services/transformers/service_transformer'
import { withTransaction } from '#shared/utils/with_transaction'
import { CreateAgenda } from '#agendas/actions/create_agenda'
import { GetServices } from '#services/queries/get_services'
import { uuidSchema } from '#shared/validators'

@inject()
export default class CreateAgendaController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      color: vine.string(),
      serviceIds: vine.array(uuidSchema()).optional(),
    })
  )

  constructor(
    private readonly getServices: GetServices,
    private readonly createAgenda: CreateAgenda
  ) {}

  async render({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { services } = await this.getServices.execute({ tenantId: user.tenantId })

    return inertia.render('agendas/form', {
      services: ServiceTransformer.transform(services),
    })
  }

  async execute({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(CreateAgendaController.validator)

    const user = auth.getUserOrFail()

    await withTransaction(() => {
      return this.createAgenda.execute({ ...payload, tenantId: user.tenantId })
    })

    return response.redirect().back()
  }
}
