import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DeleteScheduleDay } from '#scheduling/actions/delete_schedule_day'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class DeleteScheduleDayController {
  constructor(private readonly deleteScheduleDay: DeleteScheduleDay) {}

  async execute({ params, response }: HttpContext) {
    await withTransaction(() => {
      return this.deleteScheduleDay.execute({ id: params.id })
    })

    return response.redirect().back()
  }
}
