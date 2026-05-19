import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTypeTransformer from '#appointment_types/transformers/appointment_type_transformer'
import { GetAppointmentTypes } from '#appointment_types/queries/get_appointment_types'

@inject()
export default class ListAppointmentTypesController {
  constructor(private readonly getAppointmentTypes: GetAppointmentTypes) {}

  async render({ request, inertia, auth }: HttpContext) {
    const search = request.input('search', undefined)

    const user = auth.getUserOrFail()

    const { appointmentTypes } = await this.getAppointmentTypes.execute({
      tenantId: user.tenantId,
      search,
    })

    return inertia.render('appointment_types/list', {
      appointmentTypes: AppointmentTypeTransformer.transform(appointmentTypes),
    })
  }
}
