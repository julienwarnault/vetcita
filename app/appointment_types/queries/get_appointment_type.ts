import AppointmentType from '#appointment_types/models/appointment_type'
import type { UUID } from '#app/shared/types'

interface GetAppointmentTypeParams {
  id: UUID
}

export class GetAppointmentType {
  async execute(params: GetAppointmentTypeParams) {
    const appointmentType = await AppointmentType.findOrFail(params.id)

    return { appointmentType }
  }
}
