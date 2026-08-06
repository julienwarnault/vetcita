import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { AppointmentStatus } from '#appointment_workflow/enums/appointment_status'
import { dispatchAfterCommit } from '#shared/utils/dispatch_after_commit'
import { transactionContext } from '#shared/contexts/transaction_context'
import { BookingRefService } from '#booking/services/booking_ref_service'
import Appointment, { BookingMode } from '#booking/models/appointment'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import Service from '#services/models/service'
import { events } from '#generated/events'
import type { UUID } from '#shared/types'

interface CreateAppointmentParams {
  serviceId: UUID
  agendaId: UUID
  clientId: UUID
  petId: UUID
  startDate: string
  tenantId: UUID
  bookingMode?: BookingMode
}

@inject()
export class CreateAppointment {
  constructor(private readonly bookingRef: BookingRefService) {}

  async execute(params: CreateAppointmentParams) {
    const trx = transactionContext.get()

    const service = await Service.query({ client: trx })
      .where('id', params.serviceId)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    const startDate = DateTime.fromISO(params.startDate, { zone: DEFAULT_TIMEZONE })
    const endDate = startDate.plus({ minutes: service.duration })

    const bookingRef = await this.bookingRef.generateUnique()

    const appointment = await Appointment.create(
      {
        serviceId: params.serviceId,
        clientId: params.clientId,
        agendaId: params.agendaId,
        petId: params.petId,
        startDate,
        endDate,
        duration: service.duration,
        tenantId: params.tenantId,
        bookingRef: bookingRef,
        bookingMode: params.bookingMode ?? 'phone',
        statusId: AppointmentStatus.BOOKED,
      },
      { client: trx }
    )

    await dispatchAfterCommit(async () => {
      await events.booking.AppointmentCreated.dispatch(appointment)
    })

    return { appointment }
  }
}
