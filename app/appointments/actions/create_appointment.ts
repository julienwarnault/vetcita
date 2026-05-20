import { DateTime } from 'luxon'
import { transactionContext } from '#app/shared/contexts/transaction_context'
import Appointment from '#appointments/models/appointment'
import type { UUID } from '#app/shared/types'

interface CreateAppointmentParams {
  appointmentTypeId: UUID
  patientId: UUID
  startDate: string
  endDate: string
  duration: number
  tenantId: UUID
}

export class CreateAppointment {
  async execute(params: CreateAppointmentParams) {
    const trx = transactionContext.get()

    const appointment = await Appointment.create(
      {
        appointmentTypeId: params.appointmentTypeId,
        patientId: params.patientId,
        startDate: DateTime.fromISO(params.startDate),
        endDate: DateTime.fromISO(params.endDate),
        duration: params.duration,
        tenantId: params.tenantId,
      },
      { client: trx }
    )

    return { appointment }
  }
}
