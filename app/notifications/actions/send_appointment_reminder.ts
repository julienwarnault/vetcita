import { DateTime } from 'luxon'
import mail from '@adonisjs/mail/services/main'
import AppointmentReminderNotification from '#notifications/mails/appointment_reminder_notification'
import type Appointment from '#booking/models/appointment'

interface SendAppointmentReminderParams {
  appointment: Appointment
}

export class SendAppointmentReminder {
  async execute({ appointment }: SendAppointmentReminderParams) {
    const { client } = appointment

    let sent = false

    if (client?.email) {
      await mail.send(new AppointmentReminderNotification(appointment, client.email))
      sent = true
    }

    if (sent) {
      appointment.reminderSentAt = DateTime.now().toUTC()
      await appointment.save()
    }
  }
}
