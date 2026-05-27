import { inject } from '@adonisjs/core'
import { FindOrCreatePatient } from '#patients/actions/find_or_create_patient'
import { CreateAppointment } from '#booking/actions/create_appointment'
import type { UUID } from '#app/shared/types'

interface BookAppointmentParams {
  tenantId: UUID
  appointmentTypeId: UUID
  startDate: string
  firstName: string
  lastName: string
  phone: string
  email?: string
}

@inject()
export class BookAppointment {
  constructor(
    private findOrCreatePatient: FindOrCreatePatient,
    private createAppointment: CreateAppointment
  ) {}

  async execute(params: BookAppointmentParams) {
    const patient = await this.findOrCreatePatient.handle({
      tenantId: params.tenantId,
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      phone: params.phone,
    })

    return this.createAppointment.execute({
      tenantId: params.tenantId,
      appointmentTypeId: params.appointmentTypeId,
      patientId: patient.id,
      startDate: params.startDate,
    })
  }
}
