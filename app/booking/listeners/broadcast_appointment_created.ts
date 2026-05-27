import transmit from '@adonisjs/transmit/services/main'
import type AppointmentCreated from '#booking/events/appointment_created'

export default class BroadcastAppointmentCreated {
  async handle(event: AppointmentCreated) {
    const appointment = event.appointment

    transmit.broadcast(`tenants/${appointment.tenantId}/appointments`, {
      type: 'appointment.created',
      data: {
        id: appointment.id,
        startDate: appointment.startDate.toISO(),
        bookingRef: appointment.bookingRef,
      },
    })
  }
}
