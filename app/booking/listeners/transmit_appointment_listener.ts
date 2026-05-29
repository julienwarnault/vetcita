import transmit from '@adonisjs/transmit/services/main'
import type AppointmentCreated from '#booking/events/appointment_created'

export default class TransmitAppointmentListener {
  async handle({ appointment }: AppointmentCreated) {
    transmit.broadcast(`tenants/${appointment.tenantId}/appointments`, {
      type: 'appointment.created',
      data: appointment.serialize(),
    })
  }
}
