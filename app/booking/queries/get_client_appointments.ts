import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

interface GetClientAppointmentsParams {
  tenantId: UUID
  clientId: UUID
}

export class GetClientAppointments {
  async execute(params: GetClientAppointmentsParams) {
    const appointments = await Appointment.query()
      .where('tenant_id', params.tenantId)
      .where('client_id', params.clientId)
      .orderBy('start_date')
      .preload('appointmentType')
      .preload('agenda')
      .preload('status')
      .orderBy('start_date', 'desc')

    return { appointments }
  }
}
