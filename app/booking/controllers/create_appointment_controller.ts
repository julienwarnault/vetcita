import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentStatusTransformer from '#appointment_workflow/transformers/appointment_status_transformer'
import AppointmentTypeTransformer from '#appointment_types/transformers/appointment_type_transformer'
import { GetAppointmentStatuses } from '#appointment_workflow/queries/get_appointment_statuses'
import { GetAppointmentTypes } from '#appointment_types/queries/get_appointment_types'
import { CreateAppointment } from '#booking/actions/create_appointment'
import { withTransaction } from '#shared/utils/with_transaction'
import { uuidSchema } from '#shared/validators'
import { UUID } from '#shared/types'

@inject()
export default class CreateAppointmentController {
  static validator = vine.create(
    vine.object({
      appointmentTypeId: uuidSchema(),
      agendaId: uuidSchema(),
      startDate: vine.string(),
      clientId: uuidSchema(),
      statusId: vine.string().optional(),
    })
  )

  constructor(
    private readonly getAppointmentTypes: GetAppointmentTypes,
    private readonly getAppointmentStatuses: GetAppointmentStatuses,
    private readonly createAppointment: CreateAppointment
  ) {}

  async render({ auth, inertia, request }: HttpContext) {
    const user = auth.getUserOrFail()

    const clientId: UUID | undefined = request.qs().clientId

    const [{ appointmentTypes }, { statuses }] = await Promise.all([
      this.getAppointmentTypes.execute({ tenantId: user.tenantId }),
      this.getAppointmentStatuses.execute({ tenantId: user.tenantId }),
    ])

    return inertia.render('appointments/form', {
      clientId,
      appointmentTypes: AppointmentTypeTransformer.transform(appointmentTypes),
      statuses: AppointmentStatusTransformer.transform(statuses),
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
