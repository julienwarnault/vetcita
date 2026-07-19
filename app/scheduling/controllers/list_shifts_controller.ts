import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ClosedDateTransformer from '#scheduling/transformers/closed_date_transformer'
import TimeOffTransformer from '#scheduling/transformers/time_off_transformer'
import ShiftTransformer from '#scheduling/transformers/shift_transformer'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { GetClosedDates } from '#scheduling/queries/get_closed_dates'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import { GetTimeOffs } from '#scheduling/queries/get_time_offs'
import { GetShifts } from '#scheduling/queries/get_shifts'
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
    private readonly getClosedDates: GetClosedDates,
    private readonly getTimeOffs: GetTimeOffs,
    private readonly getShifts: GetShifts
  ) {}

  async render({ request, inertia, response, auth }: HttpContext) {
    const params = await request.validateUsing(ListShiftsController.validator)

    const user = auth.getUserOrFail()

    const defaultDate = DateTime.now().setZone(DEFAULT_TIMEZONE).toFormat('yyyy-MM-dd')

    const date = params.date ?? defaultDate

    if (!params.date) {
      return response.redirect().toRoute('list_shifts.render', {}, { qs: { date } })
    }

    const from = DateTime.fromISO(date).startOf('week')
    const to = DateTime.fromISO(date).endOf('week')

    const [{ agendas }, { shifts }, { closedDates }, { timeOffs }] = await Promise.all([
      this.getAgendas.execute({ tenantId: user.tenantId }),
      this.getShifts.execute({ tenantId: user.tenantId, from, to }),
      this.getClosedDates.execute({ tenantId: user.tenantId, from, to }),
      this.getTimeOffs.execute({ tenantId: user.tenantId, from, to }),
    ])

    return inertia.render('shifts/list', {
      date,
      shifts: ShiftTransformer.transform(shifts),
      agendas: AgendaTransformer.transform(agendas),
      closedDates: ClosedDateTransformer.transform(closedDates),
      timeOffs: TimeOffTransformer.transform(timeOffs),
    })
  }
}
