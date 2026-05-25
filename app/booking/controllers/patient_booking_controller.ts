import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { GetAppointmentTypes } from '#appointment_types/queries/get_appointment_types'
import AppointmentTypeTransformer from '#appointment_types/transformers/appointment_type_transformer'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import { GetTenant } from '#tenants/queries/get_tenant'

@inject()
export default class PatientBookingController {
  constructor(
    private readonly getTenant: GetTenant,
    private readonly getAppointmentTypes: GetAppointmentTypes
  ) {}

  async render({ request, inertia }: HttpContext) {
    const id = request.param('tenantId')

    const { tenant } = await this.getTenant.execute({ id })
    const { appointmentTypes } = await this.getAppointmentTypes.execute({ tenantId: id })

    return inertia.render('booking/show', {
      tenant: TenantTransformer.transform(tenant),
      appointmentTypes: AppointmentTypeTransformer.transform(appointmentTypes),
    })
  }
}
