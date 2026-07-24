import { DateTime } from 'luxon'
import { AppointmentStatus } from '#appointment_workflow/enums/appointment_status'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

interface SearchAppointmentsParams {
  tenantId: UUID
  clientIds?: UUID[]
  search?: string
  limit: number
}

export class SearchAppointments {
  async execute(params: SearchAppointmentsParams) {
    const now = DateTime.now().setZone(DEFAULT_TIMEZONE)

    const query = Appointment.query()
      .where('tenant_id', params.tenantId)
      .where('start_date', '>=', now.toUTC().toISO()!)
      .where('statusId', AppointmentStatus.BOOKED)
      .preload('appointmentType')
      .preload('client')
      .preload('pet')
      .preload('agenda')
      .preload('status')
      .orderBy('start_date', 'asc')
      .limit(params.limit)

    if (params.clientIds) {
      query.whereIn('client_id', params.clientIds)
    }

    if (!params.clientIds && params.search) {
      const ref = `%${params.search}%`
      query.whereILike('booking_ref', ref)
    }

    const appointments = await query

    return { appointments }
  }
}
