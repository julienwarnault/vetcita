import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ClosedDateTransformer from '#scheduling/transformers/closed_date_transformer'
import { UpdateClosedDate } from '#scheduling/actions/update_closed_date'
import { GetClosedDate } from '#scheduling/queries/get_closed_date'
import { withTransaction } from '#shared/utils/with_transaction'

@inject()
export default class UpdateClosedDateController {
  static validator = vine.create(
    vine.object({
      start: vine.date(),
      end: vine.date().afterOrSameAs('start'),
      description: vine.string().optional(),
    })
  )

  constructor(
    private readonly getClosedDate: GetClosedDate,
    private readonly updateClosedDate: UpdateClosedDate
  ) {}

  async render({ inertia, tenantId, params }: HttpContext) {
    const { closedDate } = await this.getClosedDate.execute({ tenantId, id: params.id })

    return inertia.render('shifts/closed_date_form', {
      closedDate: ClosedDateTransformer.transform(closedDate),
    })
  }

  async execute({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(UpdateClosedDateController.validator)

    await withTransaction(() => {
      return this.updateClosedDate.execute({ id: params.id, ...payload })
    })

    return response.redirect().back()
  }
}
