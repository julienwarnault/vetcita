import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { GetAppointment } from '#booking/queries/get_appointment'

@inject()
export default class ConfirmAppointmentController {
  constructor(private readonly getAppointment: GetAppointment) {}

  async render({ params, inertia }: HttpContext) {
    const { appointment } = await this.getAppointment.execute({
      id: params.appointmentId,
      tenantId: params.tenantId,
    })

    return inertia.render('booking/confirm', {
      appointment: AppointmentTransformer.transform(appointment),
    })
  }
}
