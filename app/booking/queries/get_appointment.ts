import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

interface GetAppointmentParams {
  id: UUID
  tenantId: UUID
}

export class GetAppointment {
  async execute(params: GetAppointmentParams) {
    const appointment = await Appointment.query()
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .preload('appointmentType')
      .preload('patient')
      .preload('tenant')
      .preload('status')
      .firstOrFail()

    return { appointment }
  }
}
