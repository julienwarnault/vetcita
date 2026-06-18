import Appointment from '#booking/models/appointment'
import type { UUID } from '#app/shared/types'

interface GetPatientAppointmentsParams {
  tenantId: UUID
  patientId: UUID
}

export class GetPatientAppointments {
  async execute(params: GetPatientAppointmentsParams) {
    const appointments = await Appointment.query()
      .where('tenant_id', params.tenantId)
      .where('patient_id', params.patientId)
      .orderBy('start_date')
      .preload('appointmentType')
      .preload('agenda')
      .preload('status')
      .orderBy('start_date', 'desc')

    return { appointments }
  }
}
