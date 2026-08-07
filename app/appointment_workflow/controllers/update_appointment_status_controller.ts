import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentStatusTransformer from '#appointment_workflow/transformers/appointment_status_transformer'
import { UpdateAppointmentStatus } from '#appointment_workflow/actions/update_appointment_status'
import { GetAppointmentStatus } from '#appointment_workflow/queries/get_appointment_status'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class UpdateAppointmentStatusController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      color: vine.string(),
      icon: vine.string(),
    })
  )

  constructor(
    private readonly getAppointmentStatus: GetAppointmentStatus,
    private readonly updateAppointmentStatus: UpdateAppointmentStatus
  ) {}

  async render({ inertia, params, tenantId }: HttpContext) {
    const { status } = await this.getAppointmentStatus.execute({
      id: params.id,
      tenantId,
    })

    return inertia.render('appointment_statuses/form', {
      status: AppointmentStatusTransformer.transform(status),
    })
  }

  async execute({ request, params, response, tenantId }: HttpContext) {
    const payload = await request.validateUsing(UpdateAppointmentStatusController.validator)

    await withTransaction(() => {
      return this.updateAppointmentStatus.execute({
        id: params.id,
        tenantId,
        ...payload,
      })
    })

    return response.redirect().toRoute('list_appointment_statuses.render')
  }
}
