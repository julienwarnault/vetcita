import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { CreateClosedDate } from '#scheduling/actions/create_closed_date'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class CreateClosedDateController {
  static validator = vine.create(
    vine.object({
      start: vine.date(),
      end: vine.date().afterOrSameAs('start'),
      description: vine.string().optional(),
    })
  )

  constructor(private readonly createClosedDate: CreateClosedDate) {}

  async render({ inertia, request }: HttpContext) {
    const initialDate = request.input('initialDate', null)

    return inertia.render('shifts/closed_date_form', {
      initialDate,
    })
  }

  async execute({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(CreateClosedDateController.validator)

    const user = auth.getUserOrFail()

    await withTransaction(() => {
      return this.createClosedDate.execute({ ...payload, tenantId: user.tenantId })
    })

    return response.redirect().back()
  }
}
