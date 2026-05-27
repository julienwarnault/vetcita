import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { transactionContext } from '#app/shared/contexts/transaction_context'
import { BookingRefService } from '#booking/services/booking_ref_service'
import AppointmentType from '#appointment_types/models/appointment_type'
import { DEFAULT_TIMEZONE } from '#app/shared/services/time_service'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#app/shared/types'

interface CreateAppointmentParams {
  appointmentTypeId: UUID
  patientId: UUID
  startDate: string
  tenantId: UUID
}

@inject()
export class CreateAppointment {
  constructor(private bookingRef: BookingRefService) {}

  async execute(params: CreateAppointmentParams) {
    const trx = transactionContext.get()

    const appointmentType = await AppointmentType.query({ client: trx })
      .where('id', params.appointmentTypeId)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    const startDate = DateTime.fromISO(params.startDate, { zone: DEFAULT_TIMEZONE })
    const endDate = startDate.plus({ minutes: appointmentType.duration })

    const bookingRef = await this.bookingRef.generateUnique()

    const appointment = await Appointment.create(
      {
        appointmentTypeId: params.appointmentTypeId,
        patientId: params.patientId,
        startDate,
        endDate,
        duration: appointmentType.duration,
        tenantId: params.tenantId,
        bookingRef: bookingRef,
      },
      { client: trx }
    )

    return { appointment }
  }
}
