import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { CreateAppointmentType } from '#appointment_types/actions/create_appointment_type'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { withTransaction } from '#app/shared/utils/with_transaction'
import { GetAgendas } from '#agendas/queries/get_agendas'
import { uuidSchema } from '#app/shared/validators'

@inject()
export default class CreateAppointmentTypeController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      color: vine.string(),
      duration: vine.number().positive(),
      price: vine.number().optional(),
      description: vine.string().optional(),
      agendaIds: vine.array(uuidSchema()).optional(),
    })
  )

  constructor(
    private readonly getAgendas: GetAgendas,
    private readonly createAppointmentType: CreateAppointmentType
  ) {}

  async render({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { agendas } = await this.getAgendas.execute({ tenantId: user.tenantId })

    return inertia.render('appointment_types/form', {
      agendas: AgendaTransformer.transform(agendas),
    })
  }

  async execute({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(CreateAppointmentTypeController.validator)

    const user = auth.getUserOrFail()

    await withTransaction(() => {
      return this.createAppointmentType.execute({ ...payload, tenantId: user.tenantId })
    })

    return response.redirect().toRoute('list_appointment_types.render')
  }
}
