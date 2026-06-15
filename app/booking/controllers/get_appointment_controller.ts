import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { GetAppointment } from '#booking/queries/get_appointment'

@inject()
export default class ShowAppointmentController {
  constructor(private readonly getAppointment: GetAppointment) {}

  async render({ inertia, params }: HttpContext) {
    const { appointment } = await this.getAppointment.execute({
      id: params.id,
    })

    return inertia.render('appointments/show', {
      appointment: AppointmentTransformer.transform(appointment),
    })
  }
}
