import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DeleteService } from '#services/actions/delete_service'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class DeleteServiceController {
  constructor(private readonly deleteService: DeleteService) {}

  async execute({ params, response }: HttpContext) {
    await withTransaction(() => {
      return this.deleteService.execute({ id: params.id })
    })

    return response.noContent()
  }
}
