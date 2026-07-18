import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTypeTransformer from '#appointment_types/transformers/appointment_type_transformer'
import { GetAppointmentTypes } from '#appointment_types/queries/get_appointment_types'
import { withTransaction } from '#shared/utils/with_transaction'
import { CreateAgenda } from '#agendas/actions/create_agenda'
import { uuidSchema } from '#shared/validators'

@inject()
export default class CreateAgendaController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      color: vine.string(),
      appointmentTypeIds: vine.array(uuidSchema()).optional(),
    })
  )

  constructor(
    private readonly getAppointmentTypes: GetAppointmentTypes,
    private readonly createAgenda: CreateAgenda
  ) {}

  async render({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { appointmentTypes } = await this.getAppointmentTypes.execute({ tenantId: user.tenantId })

    return inertia.render('agendas/form', {
      appointmentTypes: AppointmentTypeTransformer.transform(appointmentTypes),
    })
  }

  async execute({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(CreateAgendaController.validator)

    const user = auth.getUserOrFail()

    await withTransaction(() => {
      return this.createAgenda.execute({ ...payload, tenantId: user.tenantId })
    })

    return response.redirect().back()
  }
}
