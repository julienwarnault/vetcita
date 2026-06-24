import { DateTime } from 'luxon'
import { AppointmentStatus } from '#appointment_workflow/enums/appointment_status'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

interface GetUpcomingAppointmentsParams {
  tenantId: UUID
  days?: number
}

export class GetUpcomingAppointments {
  async execute({ tenantId, days = 7 }: GetUpcomingAppointmentsParams) {
    const now = DateTime.now().plus({ days: 1 }).setZone(DEFAULT_TIMEZONE)

    const startOfDay = now.startOf('day').toUTC().toISO()!
    const endOfPeriod = now.plus({ days }).endOf('day').toUTC().toISO()!

    const appointments = await Appointment.query()
      .where('tenant_id', tenantId)
      .where('status_id', AppointmentStatus.BOOKED)
      .where('start_date', '>=', startOfDay)
      .where('start_date', '<=', endOfPeriod)
      .orderBy('start_date', 'asc')

    const grouped = appointments.reduce<Record<string, number>>((acc, appointment) => {
      const date = appointment.startDate.setZone(DEFAULT_TIMEZONE).toFormat('yyyy-MM-dd')
      acc[date] = (acc[date] ?? 0) + 1
      return acc
    }, {})

    const upcoming = Array.from({ length: days }, (_, i) => {
      const date = now.plus({ days: i }).toFormat('yyyy-MM-dd')
      return { date, active: grouped[date] ?? 0 }
    })

    return { upcoming }
  }
}
