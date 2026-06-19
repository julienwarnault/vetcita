import AppointmentType from '#appointment_types/models/appointment_type'
import type { UUID } from '#shared/types'

interface GetAppointmentTypeParams {
  id: UUID
  tenantId?: UUID
}

export class GetAppointmentType {
  async execute(params: GetAppointmentTypeParams) {
    const query = AppointmentType.query().where('id', params.id).preload('agendas')

    if (params.tenantId) {
      query.where('tenant_id', params.tenantId)
    }

    const appointmentType = await query.firstOrFail()

    return { appointmentType }
  }
}
