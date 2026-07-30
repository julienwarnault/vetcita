import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DeleteAppointmentStatus } from '#appointment_workflow/actions/delete_appointment_status'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class DeleteAppointmentStatusController {
  constructor(private readonly deleteAppointmentStatus: DeleteAppointmentStatus) {}

  async execute({ params, response, tenantId }: HttpContext) {
    await withTransaction(() => {
      return this.deleteAppointmentStatus.execute({ id: params.id, tenantId })
    })

    return response.redirect().toRoute('list_appointment_statuses.render')
  }
}
