import { DateTime } from 'luxon'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import Vaccine from '#medical_records/models/vaccine'

export class GetVaccinesNeedingReminder {
  async execute() {
    const now = DateTime.now().setZone(DEFAULT_TIMEZONE)
    const reminderDateStart = now.plus({ weeks: 3 }).startOf('day')
    const reminderDateEnd = reminderDateStart.plus({ days: 1 })

    const vaccines = await Vaccine.query()
      .where('next_due_date', '>=', reminderDateStart.toISODate()!)
      .where('next_due_date', '<', reminderDateEnd.toISODate()!)
      .whereNull('reminder_sent_at')
      .preload('tenant', (q) => q.preload('location'))
      .preload('pet', (q) => q.preload('owner'))

    return { vaccines }
  }
}
