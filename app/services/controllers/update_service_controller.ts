import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ServiceTransformer from '#services/transformers/service_transformer'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { UpdateService } from '#services/actions/update_service'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetService } from '#services/queries/get_service'
import { GetAgendas } from '#agendas/queries/get_agendas'
import { uuidSchema } from '#shared/validators'

@inject()
export default class UpdateServiceController {
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

    private readonly getService: GetService,
    private readonly updateService: UpdateService
  ) {}

  async render({ inertia, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { service } = await this.getService.execute({ id: params.id })
    const { agendas } = await this.getAgendas.execute({ tenantId: user.tenantId })

    return inertia.render('services/form', {
      service: ServiceTransformer.transform(service),
      agendas: AgendaTransformer.transform(agendas),
    })
  }

  async execute({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(UpdateServiceController.validator)

    await withTransaction(() => {
      return this.updateService.execute({ id: params.id, ...payload })
    })

    return response.redirect().toRoute('list_services.render')
  }
}
