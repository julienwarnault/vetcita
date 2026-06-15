import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTypeTransformer from '#appointment_types/transformers/appointment_type_transformer'
import { GetAppointmentTypes } from '#appointment_types/queries/get_appointment_types'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import { withTransaction } from '#app/shared/utils/with_transaction'
import { BookAppointment } from '#booking/actions/book_appointment'
import { GetTenant } from '#tenants/queries/get_tenant'
import { uuidSchema } from '#app/shared/validators'
import { UUID } from '#app/shared/types'

@inject()
export default class BookAppointmentController {
  static validator = vine.create(
    vine.object({
      appointmentTypeId: uuidSchema(),
      agendaId: uuidSchema(),
      startDate: vine.string(),
      firstName: vine.string(),
      lastName: vine.string(),
      phone: vine.string().phone(),
      email: vine.string().email(),
    })
  )

  constructor(
    private readonly getTenant: GetTenant,
    private readonly getAppointmentTypes: GetAppointmentTypes,
    private readonly bookAppointment: BookAppointment
  ) {}

  async render({ request, inertia }: HttpContext) {
    const id = request.param('tenantId')

    const { tenant } = await this.getTenant.execute({ id })
    const { appointmentTypes } = await this.getAppointmentTypes.execute({ tenantId: id })

    return inertia.render('booking/create', {
      tenant: TenantTransformer.transform(tenant),
      appointmentTypes: AppointmentTypeTransformer.transform(appointmentTypes),
    })
  }

  async execute({ request, response }: HttpContext) {
    const payload = await request.validateUsing(BookAppointmentController.validator)

    const id = request.param('tenantId') as UUID

    const { appointment } = await withTransaction(() => {
      return this.bookAppointment.execute({ ...payload, tenantId: id })
    })

    return response.redirect().toRoute('confirm_appointment.render', {
      appointmentId: appointment.id,
      tenantId: appointment.tenantId,
    })
  }
}
