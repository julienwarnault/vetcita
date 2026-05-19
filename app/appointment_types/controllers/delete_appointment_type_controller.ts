import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DeleteAppointmentType } from '#appointment_types/actions/delete_appointment_type'
import { withTransaction } from '#app/shared/utils/with_transaction'

@inject()
export default class DeleteAppointmentTypeController {
  constructor(private readonly deleteAppointmentType: DeleteAppointmentType) {}

  async execute({ params, response }: HttpContext) {
    await withTransaction(() => {
      return this.deleteAppointmentType.execute({ id: params.id })
    })

    return response.noContent()
  }
}
