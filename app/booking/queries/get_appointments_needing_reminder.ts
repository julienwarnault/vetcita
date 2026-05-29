import { DateTime } from 'luxon'
import { DEFAULT_TIMEZONE } from '#app/shared/services/time_service'
import Appointment from '#booking/models/appointment'

export class GetAppointmentsNeedingReminder {
  async execute() {
    const now = DateTime.now().setZone(DEFAULT_TIMEZONE)
    const tomorrowStart = now.plus({ days: 1 }).startOf('day')
    const tomorrowEnd = tomorrowStart.plus({ days: 1 })

    const appointments = await Appointment.query()
      .where('start_date', '>=', tomorrowStart.toUTC().toISO()!)
      .where('start_date', '<', tomorrowEnd.toUTC().toISO()!)
      .whereNull('reminder_sent_at')
      .preload('tenant')
      .preload('appointmentType')
      .preload('patient')

    return { appointments }
  }
}
