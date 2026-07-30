import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { CreateTimeOff } from '#scheduling/actions/create_time_off'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetAgendas } from '#agendas/queries/get_agendas'
import { uuidSchema } from '#shared/validators'

@inject()
export default class CreateTimeOffController {
  static validator = vine.create(
    vine.object({
      start: vine.date(),
      end: vine.date().afterOrSameAs('start'),
      startTime: vine.string(),
      endTime: vine.string(),
      type: vine.string(),
      description: vine.string().optional(),
      agendaId: uuidSchema(),
    })
  )

  constructor(
    private readonly getAgendas: GetAgendas,
    private readonly createTimeOff: CreateTimeOff
  ) {}

  async render({ inertia, request, tenantId }: HttpContext) {
    const initialDate = request.input('initialDate', null)
    const initialAgendaId = request.input('initialAgendaId', null)

    const { agendas } = await this.getAgendas.execute({ tenantId })

    return inertia.render('shifts/time_off_form', {
      initialDate,
      initialAgendaId,
      agendas: AgendaTransformer.transform(agendas),
    })
  }

  async execute({ request, response, tenantId }: HttpContext) {
    const payload = await request.validateUsing(CreateTimeOffController.validator)

    await withTransaction(() => {
      return this.createTimeOff.execute({ ...payload, tenantId })
    })

    return response.redirect().back()
  }
}
