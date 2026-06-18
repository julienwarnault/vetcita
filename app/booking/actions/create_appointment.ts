import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { SlotNotBookableException } from '#scheduling/exceptions/slot_not_bookable_exception'
import { AppointmentStatus } from '#appointment_statuses/enums/appointment_status'
import { dispatchAfterCommit } from '#app/shared/utils/dispatch_after_commit'
import { transactionContext } from '#app/shared/contexts/transaction_context'
import { CheckSlotBookable } from '#scheduling/actions/check_slot_bookable'
import { BookingRefService } from '#booking/services/booking_ref_service'
import AppointmentType from '#appointment_types/models/appointment_type'
import { DEFAULT_TIMEZONE } from '#app/shared/services/time_service'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#app/shared/types'
import { events } from '#generated/events'

interface CreateAppointmentParams {
  appointmentTypeId: UUID
  agendaId: UUID
  patientId?: UUID
  startDate: string
  tenantId: UUID
}

@inject()
export class CreateAppointment {
  constructor(
    private readonly bookingRef: BookingRefService,
    private readonly checkSlotBookable: CheckSlotBookable
  ) {}

  async execute(params: CreateAppointmentParams) {
    const trx = transactionContext.get()

    const appointmentType = await AppointmentType.query({ client: trx })
      .where('id', params.appointmentTypeId)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    const startDate = DateTime.fromISO(params.startDate, { zone: DEFAULT_TIMEZONE })
    const endDate = startDate.plus({ minutes: appointmentType.duration })

    const isBookable = await this.checkSlotBookable.execute({
      tenantId: params.tenantId,
      appointmentTypeId: params.appointmentTypeId,
      agendaId: params.agendaId,
      start: startDate,
    })

    if (!isBookable) {
      throw new SlotNotBookableException()
    }

    const bookingRef = await this.bookingRef.generateUnique()

    const appointment = await Appointment.create(
      {
        appointmentTypeId: params.appointmentTypeId,
        patientId: params.patientId,
        agendaId: params.agendaId,
        startDate,
        endDate,
        duration: appointmentType.duration,
        tenantId: params.tenantId,
        bookingRef: bookingRef,
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
