import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTypeTransformer from '#appointment_types/transformers/appointment_type_transformer'
import { UpdateAppointmentType } from '#appointment_types/actions/update_appointment_type'
import { GetAppointmentType } from '#appointment_types/queries/get_appointment_type'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetAgendas } from '#agendas/queries/get_agendas'
import { uuidSchema } from '#shared/validators'

@inject()
export default class UpdateAppointmentTypeController {
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

    private readonly getAppointmentType: GetAppointmentType,
    private readonly updateAppointmentType: UpdateAppointmentType
  ) {}

  async render({ inertia, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { appointmentType } = await this.getAppointmentType.execute({ id: params.id })
    const { agendas } = await this.getAgendas.execute({ tenantId: user.tenantId })

    return inertia.render('appointment_types/form', {
      appointmentType: AppointmentTypeTransformer.transform(appointmentType),
      agendas: AgendaTransformer.transform(agendas),
    })
  }

  async execute({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(UpdateAppointmentTypeController.validator)

    await withTransaction(() => {
      return this.updateAppointmentType.execute({ id: params.id, ...payload })
    })

    return response.redirect().toRoute('list_appointment_types.render')
  }
}
