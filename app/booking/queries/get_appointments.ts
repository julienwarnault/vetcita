import type { DateTime } from 'luxon'
import Appointment from '#booking/models/appointment'

interface GetAppointmentsParams {
  tenantId: string
  start: DateTime
  end: DateTime
}

export class GetAppointments {
  async execute(params: GetAppointmentsParams) {
    const startUtc = params.start.toUTC().toISO()!
    const endUtc = params.end.toUTC().toISO()!

    const appointments = await Appointment.query()
      .where('start_date', '<=', endUtc)
      .where('end_date', '>=', startUtc)
      .orderBy([
        { column: 'start_date', order: 'asc' },
        { column: 'duration', order: 'desc' },
      ])
      .preload('appointmentType')
      .preload('patient')

    return { appointments }
  }
}
