import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentStatusTransformer from '#appointment_workflow/transformers/appointment_status_transformer'
import { GetAppointmentStatuses } from '#appointment_workflow/queries/get_appointment_statuses'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import ServiceTransformer from '#services/transformers/service_transformer'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { UpdateAppointment } from '#booking/actions/update_appointment'
import { GetAppointment } from '#booking/queries/get_appointment'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetServices } from '#services/queries/get_services'
import { GetAgendas } from '#agendas/queries/get_agendas'
import { uuidSchema } from '#shared/validators'

@inject()
export default class UpdateAppointmentController {
  static validator = vine.create(
    vine.object({
      serviceId: uuidSchema(),
      agendaId: uuidSchema(),
      startDate: vine.string(),
      clientId: uuidSchema(),
      petId: uuidSchema(),
    })
  )

  constructor(
    private readonly getAppointment: GetAppointment,
    private readonly getServices: GetServices,
    private readonly getAgendas: GetAgendas,
    private readonly getAppointmentStatuses: GetAppointmentStatuses,
    private readonly updateAppointment: UpdateAppointment
  ) {}

  async render({ params, inertia, tenantId }: HttpContext) {
    const [{ appointment }, { services }, { agendas }, { statuses }] = await Promise.all([
      this.getAppointment.execute({ id: params.id, tenantId }),
      this.getServices.execute({ tenantId }),
      this.getAgendas.execute({ tenantId }),
      this.getAppointmentStatuses.execute({ tenantId }),
    ])

    return inertia.render('appointments/form', {
      appointment: AppointmentTransformer.transform(appointment),
      services: ServiceTransformer.transform(services),
      agendas: AgendaTransformer.transform(agendas),
      statuses: AppointmentStatusTransformer.transform(statuses),
    })
  }

  async execute({ request, response, params, tenantId }: HttpContext) {
    const payload = await request.validateUsing(UpdateAppointmentController.validator)

    await withTransaction(() => {
      return this.updateAppointment.execute({ id: params.id, tenantId, ...payload })
    })

    return response.redirect().back()
  }
}
