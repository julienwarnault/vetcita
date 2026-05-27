import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { GetAvailableSlots } from '#scheduling/actions/get_available_slots'
import { uuidSchema } from '#app/shared/validators'

@inject()
export default class GetAvailableSlotsController {
  static validator = vine.create(
    vine.object({
      tenantId: uuidSchema(),
      date: vine.string(),
    })
  )

  constructor(private readonly getAvailableSlots: GetAvailableSlots) {}

  async render({ request, serialize }: HttpContext) {
    const payload = await request.validateUsing(GetAvailableSlotsController.validator)

    const result = await this.getAvailableSlots.execute(payload)

    return await serialize.withoutWrapping(result)
  }
}
