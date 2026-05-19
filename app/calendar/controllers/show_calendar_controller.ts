import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_TIMEZONE } from '#app/shared/services/time_service'

@inject()
export default class ShowCalendarController {
  static validator = vine.create(
    vine.object({
      date: vine.string().optional(),
      view: vine.enum(['month', 'week', '3_day', 'day']).optional(),
    })
  )

  async render({ inertia, request, response }: HttpContext) {
    const params = await request.validateUsing(ShowCalendarController.validator)

    const defaultDate = DateTime.now().setZone(DEFAULT_TIMEZONE).toFormat('yyyy-MM-dd')
    const defaultView = '3_day'

    const date = params.date ?? defaultDate
    const view = params.view ?? defaultView

    if (!params.date || !params.view) {
      return response.redirect().toRoute('show_calendar.render', {}, { qs: { date, view } })
    }

    return inertia.render('calendar', { date, view })
  }
}
