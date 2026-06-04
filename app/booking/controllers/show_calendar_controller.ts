import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { DEFAULT_TIMEZONE } from '#app/shared/services/time_service'
import { GetAppointments } from '#booking/queries/get_appointments'

@inject()
export default class ShowCalendarController {
  static validator = vine.create(
    vine.object({
      date: vine.string().optional(),
      view: vine.enum(['month', 'week', '3_day', 'day']).optional(),
    })
  )

  constructor(private readonly getAppointments: GetAppointments) {}

  async render({ inertia, request, response, auth }: HttpContext) {
    const params = await request.validateUsing(ShowCalendarController.validator)

    const user = auth.getUserOrFail()

    const defaultDate = DateTime.now().setZone(DEFAULT_TIMEZONE).toFormat('yyyy-MM-dd')
    const defaultView = '3_day'

    const date = params.date ?? defaultDate
    const view = params.view ?? defaultView

    if (!params.date || !params.view) {
      return response.redirect().toRoute('show_calendar.render', {}, { qs: { date, view } })
    }

    const range = this.#getRangeDates(view, date)

    const { appointments } = await this.getAppointments.execute({
      from: range.start,
      to: range.end,
      tenantId: user.tenantId,
    })

    return inertia.render('calendar', {
      date,
      view,
      appointments: AppointmentTransformer.transform(appointments),
    })
  }

  #getRangeDates(view: string, date: string) {
    const dt = DateTime.fromISO(date)

    switch (view) {
      case 'day':
        return { start: dt.startOf('day'), end: dt.endOf('day') }
      case '3_day':
        return { start: dt.startOf('day'), end: dt.plus({ days: 2 }).endOf('day') }
      case 'week':
        return { start: dt.startOf('week'), end: dt.endOf('week') }
      case 'month':
      default:
        return { start: dt.startOf('month').startOf('week'), end: dt.endOf('month').endOf('week') }
    }
  }
}
