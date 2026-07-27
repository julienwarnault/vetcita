import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { SlotNotBookableException } from '#scheduling/exceptions/slot_not_bookable_exception'
import { CheckSlotBookable } from '#scheduling/actions/check_slot_bookable'
import { dispatchAfterCommit } from '#shared/utils/dispatch_after_commit'
import { transactionContext } from '#shared/contexts/transaction_context'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import Appointment from '#booking/models/appointment'
import Service from '#services/models/service'
import { events } from '#generated/events'
import type { UUID } from '#shared/types'

interface UpdateAppointmentParams {
  id: UUID
  tenantId: UUID
  serviceId: UUID
  agendaId: UUID
  petId: UUID
  clientId: UUID
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

    const service = await Service.query({ client: trx })
      .where('id', params.serviceId)
      .where('tenantId', appointment.tenantId)
      .firstOrFail()

    const startDate = DateTime.fromISO(params.startDate)
    const endDate = startDate.plus({ minutes: service.duration })

    const isBookable = await this.checkSlotBookable.execute({
      tenantId: appointment.tenantId,
      serviceId: params.serviceId,
      agendaId: params.agendaId,
      start: startDate.setZone(DEFAULT_TIMEZONE),
      appointmentId: params.id,
    })

    appointment.merge({
      serviceId: params.serviceId,
      clientId: params.clientId,
      agendaId: params.agendaId,
      petId: params.petId,
      startDate,
      endDate,
      duration: service.duration,
    })

    const hasScheduleChanges = this.#hasScheduleChanges(appointment)

    if (hasScheduleChanges && !isBookable) {
      throw new SlotNotBookableException()
    }

    await appointment.useTransaction(trx!).save()

    if (hasScheduleChanges) {
      await dispatchAfterCommit(async () => {
        await events.booking.AppointmentRescheduled.dispatch(appointment)
      })
    }

    return { appointment }
  }

  #hasScheduleChanges(appointment: Appointment) {
    return appointment.isDirty(['serviceId', 'agendaId', 'startDate', 'endDate', 'duration'])
  }
}
