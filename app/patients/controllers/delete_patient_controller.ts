import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { withTransaction } from '#app/shared/utils/with_transaction'
import { DeletePatient } from '#patients/actions/delete_patient'

@inject()
export default class DeletePatientController {
  constructor(private readonly deletePatient: DeletePatient) {}

  async execute({ params, response }: HttpContext) {
    await withTransaction(() => {
      return this.deletePatient.execute({ id: params.id })
    })

    return response.noContent()
  }
}
