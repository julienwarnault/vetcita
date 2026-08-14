import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentStatusTransformer from '#appointment_workflow/transformers/appointment_status_transformer'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { GetAllAppointments } from '#booking/queries/get_all_appointments'
import { GetAppointmentStatuses } from '#appointment_workflow/queries/get_appointment_statuses'
import { GetAgendas } from '#agendas/queries/get_agendas'
import { uuidListSchema } from '#shared/validators'

@inject()
export default class ListAppointmentsController {
  static validator = vine.create(
    vine.object({
      search: vine.string().trim().maxLength(50).optional(),
      agendaIds: uuidListSchema().optional(),
      statusId: vine.string().trim().optional(),
    })
  )

  constructor(
    private readonly getAllAppointments: GetAllAppointments,
    private readonly getAgendas: GetAgendas,
    private readonly getAppointmentStatuses: GetAppointmentStatuses
  ) {}

  async render({ request, inertia, tenantId }: HttpContext) {
    const params = await request.validateUsing(ListAppointmentsController.validator)

    const [{ appointments }, { agendas }, { statuses }] = await Promise.all([
      this.getAllAppointments.execute({
        tenantId,
        search: params.search,
        agendaIds: params.agendaIds,
        statusId: params.statusId,
      }),
      this.getAgendas.execute({ tenantId }),
      this.getAppointmentStatuses.execute({ tenantId }),
    ])

    return inertia.render('appointments/list', {
      agendaIds: params.agendaIds,
      statusId: params.statusId,
      appointments: AppointmentTransformer.transform(appointments),
      agendas: AgendaTransformer.transform(agendas),
      statuses: AppointmentStatusTransformer.transform(statuses),
    })
  }
}
