import { AppointmentStatus } from '#appointment_workflow/enums/appointment_status'
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
      .whereNot('status_id', AppointmentStatus.CANCELLED)
      .preload('service')
      .preload('client')
      .preload('pet')
      .preload('agenda')
      .preload('status')
      .orderBy('updated_at', 'desc')
      .limit(params.limit)

    return { appointments }
  }
}
