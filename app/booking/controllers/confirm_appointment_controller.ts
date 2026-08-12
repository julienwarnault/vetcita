import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { GetLocationBySlug } from '#tenants/queries/get_location_by_slug'
import { GetAppointment } from '#booking/queries/get_appointment'

@inject()
export default class ConfirmAppointmentController {
  constructor(
    private readonly getLocationBySlug: GetLocationBySlug,
    private readonly getAppointment: GetAppointment
  ) {}

  async render({ params, inertia, request }: HttpContext) {
    const slug = request.param('slug', null)

    const { location } = await this.getLocationBySlug.execute({ slug })

    const { appointment } = await this.getAppointment.execute({
      id: params.appointmentId,
      tenantId: location.tenantId,
    })

    return inertia.render('booking/confirm', {
      appointment: AppointmentTransformer.transform(appointment),
    })
  }
}
