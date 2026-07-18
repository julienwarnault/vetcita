import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DeleteClosedDate } from '#scheduling/actions/delete_closed_date'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class DeleteClosedDateController {
  constructor(private readonly deleteClosedDate: DeleteClosedDate) {}

  async execute({ params, response }: HttpContext) {
    await withTransaction(() => {
      return this.deleteClosedDate.execute({ id: params.id })
    })

    return response.redirect().back()
  }
}
