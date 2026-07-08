import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTypeTransformer from '#appointment_types/transformers/appointment_type_transformer'
import { GetAppointmentTypes } from '#appointment_types/queries/get_appointment_types'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { withTransaction } from '#shared/utils/with_transaction'
import { UpdateAgenda } from '#agendas/actions/update_agenda'
import { GetAgenda } from '#agendas/queries/get_agenda'
import { uuidSchema } from '#shared/validators'

@inject()
export default class UpdateAgendaController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      color: vine.string(),
      appointmentTypeIds: vine.array(uuidSchema()).optional(),
    })
  )

  constructor(
    private readonly getAppointmentTypes: GetAppointmentTypes,
    private readonly getAgenda: GetAgenda,
    private readonly updateAgenda: UpdateAgenda
  ) {}

  async render({ inertia, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { appointmentTypes } = await this.getAppointmentTypes.execute({ tenantId: user.tenantId })
    const { agenda } = await this.getAgenda.execute({ tenantId: user.tenantId, id: params.id })

    return inertia.render('agendas/form', {
      agenda: AgendaTransformer.transform(agenda),
      appointmentTypes: AppointmentTypeTransformer.transform(appointmentTypes),
    })
  }

  async execute({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(UpdateAgendaController.validator)

    await withTransaction(() => {
      return this.updateAgenda.execute({ id: params.id, ...payload })
    })

    return response.redirect().toRoute('list_agendas.render')
  }
}
