import { DateTime } from 'luxon'
import mail from '@adonisjs/mail/services/main'
import VaccineReminderNotification from '#notifications/mails/vaccine_reminder_notification'
import type Vaccine from '#medical_records/models/vaccine'

interface SendVaccineReminderParams {
  vaccine: Vaccine
}

export class SendVaccineReminder {
  async execute({ vaccine }: SendVaccineReminderParams) {
    const { pet } = vaccine
    const client = pet.owner

    let sent = false

    if (client?.email) {
      await mail.send(new VaccineReminderNotification(vaccine, client.email))
      sent = true
    }

    if (sent) {
      vaccine.reminderSentAt = DateTime.now().toUTC()
      await vaccine.save()
    }
  }
}
