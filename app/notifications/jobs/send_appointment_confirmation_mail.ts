import { Job } from '@adonisjs/queue'
import mail from '@adonisjs/mail/services/main'
import type { JobOptions } from '@adonisjs/queue/types'
import AppointmentConfirmationNotification from '#notifications/mails/appointment_confirmation_notification'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#app/shared/types'

interface SendAppointmentConfirmationMailPayload {
  appointmentId: UUID
}

export default class SendAppointmentConfirmationMail extends Job<SendAppointmentConfirmationMailPayload> {
  static options: JobOptions = {
    queue: 'default',
    maxRetries: 3,
  }

  async execute() {
    const { appointmentId } = this.payload

    const appointment = await Appointment.query()
      .where('id', appointmentId)
      .preload('patient')
      .preload('appointmentType')
      .preload('tenant')
      .first()

    if (!appointment) return

    if (!appointment.patient.email) return

    await mail.send(new AppointmentConfirmationNotification(appointment, appointment.patient.email))
  }
}
