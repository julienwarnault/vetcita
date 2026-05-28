import { DateTime } from 'luxon'
import { Job } from '@adonisjs/queue'
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'
import type { JobOptions } from '@adonisjs/queue/types'
import AppointmentReminderNotification from '#notifications/mails/appointment_reminder_notification'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#app/shared/types'

interface SendAppointmentRemindersPayload {
  appointmentId: UUID
}

export default class SendAppointmentReminders extends Job<SendAppointmentRemindersPayload> {
  static options: JobOptions = {
    queue: 'default',
    maxRetries: 3,
  }

  async execute() {
    const { appointmentId } = this.payload

    await db.transaction(async (trx) => {
      const appointment = await Appointment.query({ client: trx })
        .where('id', appointmentId)
        .preload('patient')
        .preload('appointmentType')
        .preload('tenant')
        .first()

      if (!appointment) return
      if (!appointment.patient.email) return
      if (appointment.reminderSentAt) return

      await mail.send(new AppointmentReminderNotification(appointment, appointment.patient.email))

      appointment.reminderSentAt = DateTime.now().toUTC()
      await appointment.save()
    })
  }
}
