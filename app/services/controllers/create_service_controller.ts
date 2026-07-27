import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { CreateService } from '#services/actions/create_service'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetAgendas } from '#agendas/queries/get_agendas'
import { uuidSchema } from '#shared/validators'

@inject()
export default class CreateServiceController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      color: vine.string(),
      duration: vine.number().positive(),
      price: vine.number().optional(),
      description: vine.string().optional(),
      agendaIds: vine.array(uuidSchema()).optional(),
    })
  )

  constructor(
    private readonly getAgendas: GetAgendas,
    private readonly createService: CreateService
  ) {}

  async render({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { agendas } = await this.getAgendas.execute({ tenantId: user.tenantId })

    return inertia.render('services/form', {
      agendas: AgendaTransformer.transform(agendas),
    })
  }

  async execute({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(CreateServiceController.validator)

    const user = auth.getUserOrFail()

    await withTransaction(() => {
      return this.createService.execute({ ...payload, tenantId: user.tenantId })
    })

    return response.redirect().toRoute('list_services.render')
  }
}
