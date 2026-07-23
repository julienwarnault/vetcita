import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentStatusTransformer from '#appointment_workflow/transformers/appointment_status_transformer'
import AppointmentTypeTransformer from '#appointment_types/transformers/appointment_type_transformer'
import { GetAppointmentStatuses } from '#appointment_workflow/queries/get_appointment_statuses'
import { GetAppointmentTypes } from '#appointment_types/queries/get_appointment_types'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { UpdateAppointment } from '#booking/actions/update_appointment'
import { GetAppointment } from '#booking/queries/get_appointment'
import { withTransaction } from '#shared/utils/with_transaction'
import { uuidSchema } from '#shared/validators'

@inject()
export default class UpdateAppointmentController {
  static validator = vine.create(
    vine.object({
      appointmentTypeId: uuidSchema(),
      agendaId: uuidSchema(),
      startDate: vine.string(),
      clientId: uuidSchema(),
    })
  )

  constructor(
    private readonly getAppointment: GetAppointment,
    private readonly getAppointmentTypes: GetAppointmentTypes,
    private readonly getAppointmentStatuses: GetAppointmentStatuses,
    private readonly updateAppointment: UpdateAppointment
  ) {}

  async render({ params, inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const [{ appointment }, { appointmentTypes }, { statuses }] = await Promise.all([
      this.getAppointment.execute({ id: params.id, tenantId: user.tenantId }),
      this.getAppointmentTypes.execute({ tenantId: user.tenantId }),
      this.getAppointmentStatuses.execute({ tenantId: user.tenantId }),
    ])

    return inertia.render('appointments/form', {
      appointment: AppointmentTransformer.transform(appointment),
      appointmentTypes: AppointmentTypeTransformer.transform(appointmentTypes),
      statuses: AppointmentStatusTransformer.transform(statuses),
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
