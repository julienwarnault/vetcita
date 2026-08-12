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
    const { id, tenant, client, pet, service, localStartDate, bookingRef } = this.appointment
    const { location } = tenant

    const formatedDate = localStartDate.toFormat('dd/MM/yyyy h:mma')
    const confirmUrl = urlFor(
      'confirm_appointment.render',
      { appointmentId: id, slug: location.slug },
      { prefixUrl: appUrl }
    )

    this.message
      .to(this.to)
      .subject(`[${location.name}] Recordatorio de cita: su cita es el ${formatedDate}`)
      .htmlView('emails/appointment_reminder', {
        client,
        locationName: location.name,
        petName: pet.name,
        service: service.name,
        startDate: formatedDate,
        bookingRef,
        confirmUrl,
      })
  }
}
