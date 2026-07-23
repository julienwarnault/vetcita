import mail from '@adonisjs/mail/services/main'
import AppointmentConfirmationNotification from '#notifications/mails/appointment_confirmation_notification'
import type Appointment from '#booking/models/appointment'

interface SendAppointmentConfirmationParams {
  appointment: Appointment
}

export class SendAppointmentConfirmation {
  async execute({ appointment }: SendAppointmentConfirmationParams) {
    const { client } = appointment

    if (client?.email) {
      await mail.send(new AppointmentConfirmationNotification(appointment, client.email))
    }
  }
}
