import mail from '@adonisjs/mail/services/main'
import { urlFor } from '@adonisjs/core/services/url_builder'
import AppointmentConfirmationNotification from '#notifications/mails/appointment_confirmation_notification'
import type AppointmentCreated from '#booking/events/appointment_created'
import { appUrl } from '#config/app'

export default class SendAppointmentConfirmation {
  async handle(event: AppointmentCreated) {
    const appointment = event.appointment

    const confirmUrl = this.#buildConfirmUrl(appointment.id)

    await appointment.load('patient')
    await appointment.load('appointmentType')

    const { patient } = appointment

    if (patient.email) {
      await mail.send(
        new AppointmentConfirmationNotification(appointment, patient.email, confirmUrl)
      )
    }
  }

  #buildConfirmUrl(id: string): string {
    return urlFor('confirm_appointment.render', { appointmentId: id }, { prefixUrl: appUrl })
  }
}
