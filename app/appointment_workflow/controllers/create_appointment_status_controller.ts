import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { CreateAppointmentStatus } from '#appointment_workflow/actions/create_appointment_status'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class CreateAppointmentStatusController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      color: vine.string(),
      icon: vine.string(),
    })
  )

  constructor(private readonly createAppointmentStatus: CreateAppointmentStatus) {}

  async render({ inertia }: HttpContext) {
    return inertia.render('appointment_statuses/form', {})
  }

  async execute({ request, response, tenantId }: HttpContext) {
    const payload = await request.validateUsing(CreateAppointmentStatusController.validator)

    await withTransaction(() => {
      return this.createAppointmentStatus.execute({ ...payload, tenantId })
    })

    return response.redirect().toRoute('list_appointment_statuses.render')
  }
}
