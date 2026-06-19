import { BaseMail } from '@adonisjs/mail'
import { DEFAULT_TIMEZONE } from '#app/shared/services/time_service'
import { urlFor } from '@adonisjs/core/services/url_builder'
import type Appointment from '#booking/models/appointment'
import { appUrl } from '#config/app'

export default class AppointmentConfirmationNotification extends BaseMail {
  subject = 'Confirmación de su cita'

  constructor(
    private appointment: Appointment,
    private to: string
  ) {
    super()
  }

  prepare() {
    const { id, patient, appointmentType, startDate, bookingRef, tenantId } = this.appointment

    const url = urlFor('confirm_appointment.render', { appointmentId: id, tenantId }, { prefixUrl: appUrl })

    this.message.to(this.to).htmlView('emails/appointment_confirmation', {
      patient,
      appointmentType: appointmentType.name,
      startDate: startDate.setZone(DEFAULT_TIMEZONE).toFormat('dd/MM/yyyy h:mma'),
      bookingRef,
      confirmUrl: url,
    })
  }
}
