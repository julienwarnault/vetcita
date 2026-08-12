import { BaseMail } from '@adonisjs/mail'
import { urlFor } from '@adonisjs/core/services/url_builder'
import type Vaccine from '#medical_records/models/vaccine'
import { appUrl } from '#config/app'

export default class VaccineReminderNotification extends BaseMail {
  constructor(
    private vaccine: Vaccine,
    private to: string
  ) {
    super()
  }

  prepare() {
    const { pet, name, nextDueDate, tenant } = this.vaccine
    const { location } = tenant

    const formatedDate = nextDueDate!.toFormat('dd/MM/yyyy')
    const bookingUrl = urlFor('book_appointment.render', { slug: tenant.location.slug }, { prefixUrl: appUrl })

    this.message
      .to(this.to)
      .subject(`[${location.name}] Recordatorio de vacuna: ${pet.name} debe recibir ${name} el ${formatedDate}`)
      .htmlView('emails/vaccine_reminder', {
        client: pet.owner,
        locationName: tenant.location.name,
        petName: pet.name,
        vaccineName: name,
        nextDueDate: formatedDate,
        bookingUrl,
      })
  }
}
