import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

interface GetLastAppointmentsUpdatedParams {
  tenantId: UUID
  limit: number
}

export class GetLastAppointmentsUpdated {
  async execute(params: GetLastAppointmentsUpdatedParams) {
    const appointments = await Appointment.query()
      .where('tenant_id', params.tenantId)
      .preload('appointmentType')
      .preload('patient')
      .preload('agenda')
      .preload('status')
      .orderBy('updated_at', 'desc')
      .limit(params.limit)

    return { appointments }
  }
}
