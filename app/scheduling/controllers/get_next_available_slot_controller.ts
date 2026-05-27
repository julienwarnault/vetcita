import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { GetNextAvailableSlot } from '#scheduling/actions/get_next_available_slot'
import { uuidSchema } from '#app/shared/validators'

@inject()
export default class GetNextAvailableSlotController {
  static validator = vine.create(
    vine.object({
      tenantId: uuidSchema(),
      from: vine.string().optional(),
    })
  )

  constructor(private readonly getNextAvailableSlot: GetNextAvailableSlot) {}

  async render({ request, serialize }: HttpContext) {
    const payload = await request.validateUsing(GetNextAvailableSlotController.validator)

    const result = await this.getNextAvailableSlot.execute(payload)

    return await serialize.withoutWrapping(result)
  }
}
