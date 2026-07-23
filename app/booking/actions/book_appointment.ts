import { inject } from '@adonisjs/core'
import { FindOrUpdateClient } from '#clients/actions/find_or_update_client'
import { CreateAppointment } from '#booking/actions/create_appointment'
import type { UUID } from '#shared/types'

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
    private findOrUpdateClient: FindOrUpdateClient,
    private createAppointment: CreateAppointment
  ) {}

  async execute(params: BookAppointmentParams) {
    const client = await this.findOrUpdateClient.handle({
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
      clientId: client.id,
      startDate: params.startDate,
    })
  }
}
