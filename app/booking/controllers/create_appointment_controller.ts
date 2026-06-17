import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTypeTransformer from '#appointment_types/transformers/appointment_type_transformer'
import { GetAppointmentTypes } from '#appointment_types/queries/get_appointment_types'
import { CreateAppointment } from '#booking/actions/create_appointment'
import { withTransaction } from '#app/shared/utils/with_transaction'
import { uuidSchema } from '#app/shared/validators'
import { UUID } from '#app/shared/types'

@inject()
export default class CreateAppointmentController {
  static validator = vine.create(
    vine.object({
      appointmentTypeId: uuidSchema(),
      agendaId: uuidSchema(),
      startDate: vine.string(),
      patientId: uuidSchema().optional(),
    })
  )

  constructor(
    private readonly getAppointmentTypes: GetAppointmentTypes,
    private readonly createAppointment: CreateAppointment
  ) {}

  async render({ auth, inertia, request }: HttpContext) {
    const user = auth.getUserOrFail()

    const patientId: UUID | undefined = request.qs().patientId

    const { appointmentTypes } = await this.getAppointmentTypes.execute({ tenantId: user.tenantId })

    return inertia.render('appointments/form', {
      patientId,
      appointmentTypes: AppointmentTypeTransformer.transform(appointmentTypes),
    })
  }

  async execute({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(CreateAppointmentController.validator)

    const user = auth.getUserOrFail()

    await withTransaction(() => {
      return this.createAppointment.execute({ ...payload, tenantId: user.tenantId })
    })

    return response.redirect().back()
  }
}
