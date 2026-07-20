import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ScheduleDayTransformer from '#scheduling/transformers/schedule_day_transformer'
import { UpdateScheduleDay } from '#scheduling/actions/update_schedule_day'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { GetScheduleDay } from '#scheduling/queries/get_schedule_day'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetAgenda } from '#agendas/queries/get_agenda'

@inject()
export default class UpdateScheduleDayController {
  static validator = vine.create(
    vine.object({
      shifts: vine.array(vine.object({ startTime: vine.string(), endTime: vine.string() })),
    })
  )

  constructor(
    private readonly getAgenda: GetAgenda,
    private readonly getScheduleDay: GetScheduleDay,
    private readonly updateScheduleDay: UpdateScheduleDay
  ) {}

  async render({ inertia, auth, params }: HttpContext) {
    const user = auth.getUserOrFail()

    const { scheduleDay } = await this.getScheduleDay.execute({ id: params.id, tenantId: user.tenantId })
    const { agenda } = await this.getAgenda.execute({ id: scheduleDay.agendaId, tenantId: user.tenantId })

    return inertia.render('shifts/schedule_day_form', {
      date: scheduleDay.date.toISODate()!,
      agenda: AgendaTransformer.transform(agenda),
      scheduleDay: ScheduleDayTransformer.transform(scheduleDay),
    })
  }

  async execute({ request, response, params }: HttpContext) {
    const payload = await request.validateUsing(UpdateScheduleDayController.validator)

    await withTransaction(() => {
      return this.updateScheduleDay.execute({ id: params.id, ...payload })
    })

    return response.redirect().back()
  }
}
