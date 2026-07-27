import { AppointmentStatus } from '#appointment_workflow/enums/appointment_status'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

interface GetPetAppointmentsParams {
  tenantId: UUID
  petId: UUID
}

export class GetPetAppointments {
  async execute(params: GetPetAppointmentsParams) {
    const appointments = await Appointment.query()
      .where('tenant_id', params.tenantId)
      .where('pet_id', params.petId)
      .whereNot('status_id', AppointmentStatus.CANCELLED)
      .orderBy('start_date')
      .preload('service')
      .preload('agenda')
      .preload('status')
      .orderBy('start_date', 'desc')

    return { appointments }
  }
}
