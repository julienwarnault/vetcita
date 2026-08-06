import { DateTime } from 'luxon'
import { dispatchAfterCommit } from '#shared/utils/dispatch_after_commit'
import { transactionContext } from '#shared/contexts/transaction_context'
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

export class UpdateAppointment {
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
