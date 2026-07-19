import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DeleteTimeOff } from '#scheduling/actions/delete_time_off'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class DeleteTimeOffController {
  constructor(private readonly deleteTimeOff: DeleteTimeOff) {}

  async execute({ params, response }: HttpContext) {
    await withTransaction(() => {
      return this.deleteTimeOff.execute({ id: params.id })
    })

    return response.redirect().back()
  }
}
