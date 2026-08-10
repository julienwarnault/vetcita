import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { withTransaction } from '#shared/utils/with_transaction'
import { DeleteClient } from '#clients/actions/delete_client'

@inject()
export default class DeleteClientController {
  constructor(private readonly deleteClient: DeleteClient) {}

  async execute({ params, response, tenantId }: HttpContext) {
    await withTransaction(() => {
      return this.deleteClient.execute({ id: params.id, tenantId })
    })

    return response.redirect().back()
  }
}
