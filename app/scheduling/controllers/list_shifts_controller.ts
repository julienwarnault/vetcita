import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import WorkingHourTransformer from '#scheduling/transformers/working_hour_transformer'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { GetWorkingHours } from '#scheduling/queries/get_working_hours'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import { GetAgendas } from '#agendas/queries/get_agendas'

@inject()
export default class ListShiftsController {
  static validator = vine.create(
    vine.object({
      date: vine.string().optional(),
    })
  )

  constructor(
    private readonly getAgendas: GetAgendas,
    private readonly getWorkingHours: GetWorkingHours
  ) {}

  async render({ request, inertia, response, auth }: HttpContext) {
    const params = await request.validateUsing(ListShiftsController.validator)

    const user = auth.getUserOrFail()

    const defaultDate = DateTime.now().setZone(DEFAULT_TIMEZONE).toFormat('yyyy-MM-dd')

    const date = params.date ?? defaultDate

    if (!params.date) {
      return response.redirect().toRoute('list_shifts.render', {}, { qs: { date } })
    }

    const [{ agendas }, { workingHours }] = await Promise.all([
      this.getAgendas.execute({ tenantId: user.tenantId }),
      this.getWorkingHours.execute({ tenantId: user.tenantId }),
    ])

    return inertia.render('shifts/list', {
      date,
      agendas: AgendaTransformer.transform(agendas),
      workingHours: WorkingHourTransformer.transform(workingHours),
    })
  }
}
