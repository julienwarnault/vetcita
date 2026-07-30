import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { MoveAppointmentStatus } from '#appointment_workflow/actions/move_appointment_status'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class MoveAppointmentStatusController {
  static validator = vine.create(
    vine.object({
      direction: vine.enum(['up', 'down'] as const),
    })
  )

  constructor(private readonly moveAppointmentStatus: MoveAppointmentStatus) {}

  async execute({ params, request, response, tenantId }: HttpContext) {
    const payload = await request.validateUsing(MoveAppointmentStatusController.validator)

    await withTransaction(() => {
      return this.moveAppointmentStatus.execute({
        id: params.id,
        direction: payload.direction,
        tenantId,
      })
    })

    return response.redirect().back()
  }
}
