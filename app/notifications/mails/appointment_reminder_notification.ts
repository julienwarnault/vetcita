import { BaseMail } from '@adonisjs/mail'
import { urlFor } from '@adonisjs/core/services/url_builder'
import type Appointment from '#booking/models/appointment'
import { appUrl } from '#config/app'

export default class AppointmentReminderNotification extends BaseMail {
  constructor(
    private appointment: Appointment,
    private to: string
  ) {
    super()
  }

  prepare() {
    const { id, client, tenant, pet, service, localStartDate, bookingRef, tenantId } = this.appointment

    const formatedDate = localStartDate.toFormat('dd/MM/yyyy h:mma')
    const confirmUrl = urlFor('confirm_appointment.render', { appointmentId: id, tenantId }, { prefixUrl: appUrl })

    this.message
      .to(this.to)
      .subject(`Recordatorio de cita: su cita es el ${formatedDate}`)
      .htmlView('emails/appointment_reminder', {
        client,
        tenantName: tenant.name,
        petName: pet.name,
        service: service.name,
        startDate: formatedDate,
        bookingRef,
        confirmUrl,
      })
  }
}
