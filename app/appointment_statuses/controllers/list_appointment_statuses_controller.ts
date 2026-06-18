import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentStatusTransformer from '#appointment_statuses/transformers/appointment_status_transformer'
import { GetAppointmentStatuses } from '#appointment_statuses/queries/get_appointment_statuses'

@inject()
export default class ListAppointmentStatusesController {
  constructor(private readonly getAppointmentStatuses: GetAppointmentStatuses) {}

  async render({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { statuses } = await this.getAppointmentStatuses.execute({
      tenantId: user.tenantId,
    })

    return inertia.render('appointment_statuses/list', {
      statuses: AppointmentStatusTransformer.transform(statuses),
    })
  }
}
