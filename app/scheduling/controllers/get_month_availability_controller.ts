import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { GetMonthAvailability } from '#scheduling/actions/get_month_availability'
import { uuidSchema } from '#app/shared/validators'

@inject()
export default class GetMonthAvailabilityController {
  static validator = vine.create(
    vine.object({
      tenantId: uuidSchema(),
      date: vine.string(),
    })
  )

  constructor(private readonly getMonthAvailability: GetMonthAvailability) {}

  async render({ request, serialize }: HttpContext) {
    const payload = await request.validateUsing(GetMonthAvailabilityController.validator)

    const result = await this.getMonthAvailability.execute(payload)

    return await serialize.withoutWrapping(result)
  }
}
