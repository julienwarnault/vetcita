import Appointment from '#booking/models/appointment'
import type { UUID } from '#app/shared/types'

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
      .firstOrFail()

    return { appointment }
  }
}
