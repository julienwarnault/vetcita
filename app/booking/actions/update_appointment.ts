import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { SlotNotBookableException } from '#scheduling/exceptions/slot_not_bookable_exception'
import { CheckSlotBookable } from '#scheduling/actions/check_slot_bookable'
import { dispatchAfterCommit } from '#shared/utils/dispatch_after_commit'
import { transactionContext } from '#shared/contexts/transaction_context'
import AppointmentType from '#appointment_types/models/appointment_type'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import Appointment from '#booking/models/appointment'
import { events } from '#generated/events'
import type { UUID } from '#shared/types'

interface UpdateAppointmentParams {
  id: UUID
  tenantId: UUID
  appointmentTypeId: UUID
  agendaId: UUID
  clientId?: UUID
  startDate: string
}

@inject()
export class UpdateAppointment {
  constructor(private readonly checkSlotBookable: CheckSlotBookable) {}

  async execute(params: UpdateAppointmentParams) {
    const trx = transactionContext.get()

    const appointment = await Appointment.query({ client: trx })
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    const appointmentType = await AppointmentType.query({ client: trx })
      .where('id', params.appointmentTypeId)
      .where('tenantId', appointment.tenantId)
      .firstOrFail()

    const startDate = DateTime.fromISO(params.startDate)
    const endDate = startDate.plus({ minutes: appointmentType.duration })

    const isBookable = await this.checkSlotBookable.execute({
      tenantId: appointment.tenantId,
      appointmentTypeId: params.appointmentTypeId,
      agendaId: params.agendaId,
      start: startDate.setZone(DEFAULT_TIMEZONE),
      appointmentId: params.id,
    })

    if (!isBookable) {
      throw new SlotNotBookableException()
    }

    appointment.merge({
      appointmentTypeId: params.appointmentTypeId,
      clientId: params.clientId ?? null,
      agendaId: params.agendaId,
      startDate,
      endDate,
      duration: appointmentType.duration,
    })

    await appointment.useTransaction(trx!).save()

    await dispatchAfterCommit(async () => {
      await events.booking.AppointmentRescheduled.dispatch(appointment)
    })

    return { appointment }
  }
}
