import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import WorkingHourTransformer from '#scheduling/transformers/working_hour_transformer'
import { CreateScheduleDay } from '#scheduling/actions/create_schedule_day'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { GetWorkingHours } from '#scheduling/queries/get_working_hours'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetAgenda } from '#agendas/queries/get_agenda'
import { uuidSchema } from '#shared/validators'

@inject()
export default class CreateScheduleDayController {
  static validator = vine.create(
    vine.object({
      agendaId: uuidSchema(),
      date: vine.date(),
      shifts: vine.array(vine.object({ startTime: vine.string(), endTime: vine.string() })),
    })
  )

  constructor(
    private readonly getAgenda: GetAgenda,
    private readonly getWorkingHours: GetWorkingHours,
    private readonly createScheduleDay: CreateScheduleDay
  ) {}

  async render({ inertia, tenantId, request }: HttpContext) {
    const agendaId = request.input('agendaId', null)
    const date = request.input('date', null)

    const from = DateTime.fromISO(date)

    const [{ agenda }, { workingHours }] = await Promise.all([
      this.getAgenda.execute({ id: agendaId, tenantId }),
      this.getWorkingHours.execute({ tenantId, dayOfWeek: from.weekday, agendaIds: [agendaId] }),
    ])

    return inertia.render('shifts/schedule_day_form', {
      date: from.toISODate()!,
      agenda: AgendaTransformer.transform(agenda),
      workingHours: WorkingHourTransformer.transform(workingHours),
    })
  }

  async execute({ request, response, tenantId }: HttpContext) {
    const payload = await request.validateUsing(CreateScheduleDayController.validator)

    await withTransaction(() => {
      return this.createScheduleDay.execute({ ...payload, tenantId })
    })

    return response.redirect().back()
  }
}
