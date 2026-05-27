import { BaseMail } from '@adonisjs/mail'
import { DEFAULT_TIMEZONE } from '#app/shared/services/time_service'
import type Appointment from '#booking/models/appointment'

export default class AppointmentConfirmationNotification extends BaseMail {
  subject = 'Confirmación de su cita'

  constructor(
    private appointment: Appointment,
    private to: string,
    private confirmUrl: string
  ) {
    super()
  }

  prepare() {
    const { patient, appointmentType, startDate, bookingRef } = this.appointment

    this.message
      .to(this.to)
      .subject('Confirmación de su cita')
      .htmlView('emails/appointment_confirmation', {
        patient,
        appointmentType: appointmentType.name,
        startDate: startDate.setZone(DEFAULT_TIMEZONE).toFormat('dd/MM/yyyy HH:mma'),
        bookingRef,
        confirmUrl: this.confirmUrl,
      })
  }
}
