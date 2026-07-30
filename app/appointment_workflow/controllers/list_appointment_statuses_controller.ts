import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentStatusTransformer from '#appointment_workflow/transformers/appointment_status_transformer'
import { GetAppointmentStatuses } from '#appointment_workflow/queries/get_appointment_statuses'

@inject()
export default class ListAppointmentStatusesController {
  constructor(private readonly getAppointmentStatuses: GetAppointmentStatuses) {}

  async render({ inertia, tenantId }: HttpContext) {
    const { statuses } = await this.getAppointmentStatuses.execute({
      tenantId,
    })

    return inertia.render('appointment_statuses/list', {
      statuses: AppointmentStatusTransformer.transform(statuses),
    })
  }
}
