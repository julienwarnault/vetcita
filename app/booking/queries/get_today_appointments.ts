import { DateTime } from 'luxon'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

interface GetTodayAppointmentsParams {
  tenantId: UUID
  search?: string
  limit: number
}

export class GetTodayAppointments {
  async execute(params: GetTodayAppointmentsParams) {
    const now = DateTime.now().setZone(DEFAULT_TIMEZONE)

    const startOfDay = now.startOf('day').toUTC().toISO()!
    const endOfDay = now.endOf('day').toUTC().toISO()!

    const appointments = await Appointment.query()
      .where('tenant_id', params.tenantId)
      .where('start_date', '>=', startOfDay)
      .where('start_date', '<=', endOfDay)
      .preload('appointmentType')
      .preload('client')
      .preload('pet')
      .preload('agenda')
      .preload('status')
      .orderBy('start_date', 'asc')
      .limit(params.limit)

    return { appointments }
  }
}
