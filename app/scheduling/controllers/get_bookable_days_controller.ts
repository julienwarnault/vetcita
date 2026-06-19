import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { GetBookableDays } from '#scheduling/actions/get_bookable_days'
import { uuidSchema } from '#shared/validators'

@inject()
export default class GetBookableDaysController {
  static validator = vine.create(
    vine.object({
      tenantId: uuidSchema(),
      appointmentTypeId: uuidSchema(),
      appointmentId: uuidSchema().optional(),
      from: vine.string(),
      to: vine.string(),
    })
  )

  constructor(private readonly getBookableDays: GetBookableDays) {}

  async render({ request, serialize }: HttpContext) {
    const payload = await request.validateUsing(GetBookableDaysController.validator)

    const result = await this.getBookableDays.execute(payload)

    return await serialize.withoutWrapping(result)
  }
}
