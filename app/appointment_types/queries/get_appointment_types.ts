import AppointmentType from '#appointment_types/models/appointment_type'
import type { UUID } from '#app/shared/types'

interface GetAppointmentTypesParams {
  tenantId: UUID
  search?: string
}

export class GetAppointmentTypes {
  async execute(params: GetAppointmentTypesParams) {
    const query = AppointmentType.query().where('tenantId', params.tenantId)

    if (params.search) {
      query.where((q) => q.whereILike('name', `%${params.search}%`))
    }

    const appointmentTypes = await query

    return { appointmentTypes }
  }
}
