import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { ChangeAppointmentStatus } from '#booking/actions/change_appointment_status'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class ChangeAppointmentStatusController {
  static validator = vine.create(
    vine.object({
      statusId: vine.string(),
    })
  )

  constructor(private readonly changeAppointmentStatus: ChangeAppointmentStatus) {}

  async execute({ request, response, params, auth }: HttpContext) {
    const payload = await request.validateUsing(ChangeAppointmentStatusController.validator)

    const user = auth.getUserOrFail()

    await withTransaction(() => {
      return this.changeAppointmentStatus.execute({
        id: params.id,
        tenantId: user.tenantId,
        statusId: payload.statusId,
      })
    })

    return response.redirect().back()
  }
}
