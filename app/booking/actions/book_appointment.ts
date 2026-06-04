import { inject } from '@adonisjs/core'
import { FindOrUpdatePatient } from '#patients/actions/find_or_update_patient'
import { CreateAppointment } from '#booking/actions/create_appointment'
import type { UUID } from '#app/shared/types'

interface BookAppointmentParams {
  tenantId: UUID
  appointmentTypeId: UUID
  agendaId: UUID
  startDate: string
  firstName: string
  lastName: string
  phone: string
  email?: string
}

@inject()
export class BookAppointment {
  constructor(
    private findOrUpdatePatient: FindOrUpdatePatient,
    private createAppointment: CreateAppointment
  ) {}

  async execute(params: BookAppointmentParams) {
    const patient = await this.findOrUpdatePatient.handle({
      tenantId: params.tenantId,
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      phone: params.phone,
    })

    return this.createAppointment.execute({
      tenantId: params.tenantId,
      appointmentTypeId: params.appointmentTypeId,
      agendaId: params.agendaId,
      patientId: patient.id,
      startDate: params.startDate,
    })
  }
}
