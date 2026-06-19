import { BaseMail } from '@adonisjs/mail'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import type Appointment from '#booking/models/appointment'

export default class AppointmentReminderNotification extends BaseMail {
  subject = 'Recordatorio de su cita'

  constructor(
    private appointment: Appointment,
    private to: string
  ) {
    super()
  }

  prepare() {
    const { patient, tenant, appointmentType, startDate, bookingRef } = this.appointment

    this.message.to(this.to).htmlView('emails/appointment_reminder', {
      patient,
      companyName: tenant.name,
      appointmentType: appointmentType.name,
      startDate: startDate.setZone(DEFAULT_TIMEZONE).toFormat('dd/MM/yyyy h:mma'),
      bookingRef,
    })
  }
}
