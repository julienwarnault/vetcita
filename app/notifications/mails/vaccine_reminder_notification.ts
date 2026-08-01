import { BaseMail } from '@adonisjs/mail'
import type Vaccine from '#medical_records/models/vaccine'
import { urlFor } from '@adonisjs/core/services/url_builder'
import { appUrl } from '#config/app'

export default class VaccineReminderNotification extends BaseMail {
  constructor(
    private vaccine: Vaccine,
    private to: string
  ) {
    super()
  }

  prepare() {
    const { tenant, tenantId, pet, name, nextDueDate } = this.vaccine

    const formatedDate = nextDueDate!.toFormat('dd/MM/yyyy')
    const bookingUrl = urlFor('book_appointment.render', { tenantId }, { prefixUrl: appUrl })

    this.message
      .to(this.to)
      .subject(`Recordatorio de vacuna: ${pet.name} debe recibir ${name} el ${formatedDate}`)
      .htmlView('emails/vaccine_reminder', {
        client: pet.owner,
        tenantName: tenant.name,
        petName: pet.name,
        vaccineName: name,
        nextDueDate: formatedDate,
        bookingUrl,
      })
  }
}
