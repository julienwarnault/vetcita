import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentStatusTransformer from '#appointment_workflow/transformers/appointment_status_transformer'
import { GetAppointmentStatuses } from '#appointment_workflow/queries/get_appointment_statuses'
import ServiceTransformer from '#services/transformers/service_transformer'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { CreateAppointment } from '#booking/actions/create_appointment'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetServices } from '#services/queries/get_services'
import { GetAgendas } from '#agendas/queries/get_agendas'
import { uuidSchema } from '#shared/validators'
import { UUID } from '#shared/types'

@inject()
export default class CreateAppointmentController {
  static validator = vine.create(
    vine.object({
      serviceId: uuidSchema(),
      agendaId: uuidSchema(),
      startDate: vine.string(),
      clientId: uuidSchema(),
      petId: uuidSchema(),
      statusId: vine.string().optional(),
    })
  )

  constructor(
    private readonly getServices: GetServices,
    private readonly getAgendas: GetAgendas,
    private readonly getAppointmentStatuses: GetAppointmentStatuses,
    private readonly createAppointment: CreateAppointment
  ) {}

  async render({ tenantId, inertia, request }: HttpContext) {
    const clientId = request.input('clientId', undefined) as UUID | undefined
    const petId = request.input('petId', undefined) as UUID | undefined

    const [{ services }, { agendas }, { statuses }] = await Promise.all([
      this.getServices.execute({ tenantId }),
      this.getAgendas.execute({ tenantId }),
      this.getAppointmentStatuses.execute({ tenantId }),
    ])

    return inertia.render('appointments/form', {
      clientId,
      petId,
      services: ServiceTransformer.transform(services),
      agendas: AgendaTransformer.transform(agendas),
      statuses: AppointmentStatusTransformer.transform(statuses),
    })
  }

  async execute({ request, response, tenantId }: HttpContext) {
    const payload = await request.validateUsing(CreateAppointmentController.validator)

    await withTransaction(() => {
      return this.createAppointment.execute({ ...payload, tenantId })
    })

    return response.redirect().back()
  }
}
