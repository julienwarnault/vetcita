import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { GetBookableSlots } from '#scheduling/actions/get_bookable_slots'
import { uuidSchema } from '#app/shared/validators'

@inject()
export default class GetBookableSlotsController {
  static validator = vine.create(
    vine.object({
      tenantId: uuidSchema(),
      appointmentTypeId: uuidSchema(),
      date: vine.string(),
    })
  )

  constructor(private readonly getBookableSlots: GetBookableSlots) {}

  async render({ request, serialize }: HttpContext) {
    const payload = await request.validateUsing(GetBookableSlotsController.validator)

    const result = await this.getBookableSlots.execute(payload)

    return await serialize.withoutWrapping(result)
  }
}
