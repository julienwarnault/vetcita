import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import TimeOffTransformer from '#scheduling/transformers/time_off_transformer'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { UpdateTimeOff } from '#scheduling/actions/update_time_off'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetTimeOff } from '#scheduling/queries/get_time_off'
import { GetAgendas } from '#agendas/queries/get_agendas'
import { uuidSchema } from '#shared/validators'

@inject()
export default class UpdateTimeOffController {
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
    private readonly getTimeOff: GetTimeOff,
    private readonly updateTimeOff: UpdateTimeOff
  ) {}

  async render({ inertia, auth, params }: HttpContext) {
    const user = auth.getUserOrFail()

    const [{ timeOff }, { agendas }] = await Promise.all([
      this.getTimeOff.execute({ tenantId: user.tenantId, id: params.id }),
      await this.getAgendas.execute({ tenantId: user.tenantId }),
    ])

    return inertia.render('shifts/time_off_form', {
      timeOff: TimeOffTransformer.transform(timeOff),
      agendas: AgendaTransformer.transform(agendas),
    })
  }

  async execute({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(UpdateTimeOffController.validator)

    await withTransaction(() => {
      return this.updateTimeOff.execute({ id: params.id, ...payload })
    })

    return response.redirect().back()
  }
}
