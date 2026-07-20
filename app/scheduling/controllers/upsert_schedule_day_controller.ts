import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UpsertScheduleDay } from '#scheduling/actions/upsert_schedule_day'
import ShiftTransformer from '#scheduling/transformers/shift_transformer'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetShifts } from '#scheduling/queries/get_shifts'
import { GetAgenda } from '#agendas/queries/get_agenda'
import { uuidSchema } from '#shared/validators'

@inject()
export default class UpsertScheduleDayController {
  static validator = vine.create(
    vine.object({
      shifts: vine.array(vine.object({ startTime: vine.string(), endTime: vine.string() })),
      params: vine.object({
        agendaId: uuidSchema(),
        date: vine.date(),
      }),
    })
  )

  constructor(
    private readonly getShifts: GetShifts,
    private readonly getAgenda: GetAgenda,
    private readonly upsertScheduleDay: UpsertScheduleDay
  ) {}

  async render({ inertia, auth, params }: HttpContext) {
    const user = auth.getUserOrFail()

    const from = DateTime.fromISO(params.date)
    const to = DateTime.fromISO(params.date)

    const [{ agenda }, { shifts }] = await Promise.all([
      this.getAgenda.execute({ id: params.agendaId, tenantId: user.tenantId }),
      this.getShifts.execute({ agendaIds: [params.agendaId], tenantId: user.tenantId, from, to }),
    ])

    return inertia.render('shifts/schedule_day_form', {
      date: from.toISODate()!,
      agenda: AgendaTransformer.transform(agenda),
      shifts: ShiftTransformer.transform(shifts),
    })
  }

  async execute({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(UpsertScheduleDayController.validator)

    const user = auth.getUserOrFail()

    await withTransaction(() => {
      return this.upsertScheduleDay.execute({ ...payload.params, ...payload, tenantId: user.tenantId })
    })

    return response.redirect().back()
  }
}
