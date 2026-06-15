import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTypeTransformer from '#appointment_types/transformers/appointment_type_transformer'
import { GetAppointmentTypes } from '#appointment_types/queries/get_appointment_types'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { UpdateAppointment } from '#booking/actions/update_appointment'
import { withTransaction } from '#app/shared/utils/with_transaction'
import { GetAppointment } from '#booking/queries/get_appointment'
import { uuidSchema } from '#app/shared/validators'

@inject()
export default class UpdateAppointmentController {
  static validator = vine.create(
    vine.object({
      appointmentTypeId: uuidSchema(),
      agendaId: uuidSchema(),
      startDate: vine.string(),
      patientId: uuidSchema().optional(),
    })
  )

  constructor(
    private readonly getAppointment: GetAppointment,
    private readonly getAppointmentTypes: GetAppointmentTypes,
    private readonly updateAppointment: UpdateAppointment
  ) {}

  async render({ params, inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { appointment } = await this.getAppointment.execute({
      id: params.id,
      tenantId: user.tenantId,
    })

    const { appointmentTypes } = await this.getAppointmentTypes.execute({
      tenantId: appointment.tenantId,
    })

    return inertia.render('appointments/form', {
      appointment: AppointmentTransformer.transform(appointment),
      appointmentTypes: AppointmentTypeTransformer.transform(appointmentTypes),
    })
  }

  async execute({ request, response, params, auth }: HttpContext) {
    const payload = await request.validateUsing(UpdateAppointmentController.validator)

    const user = auth.getUserOrFail()

    await withTransaction(() => {
      return this.updateAppointment.execute({ id: params.id, tenantId: user.tenantId, ...payload })
    })

    return response.redirect().back()
  }
}
