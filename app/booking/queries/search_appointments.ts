import { DateTime } from 'luxon'
import { AppointmentStatus } from '#appointment_workflow/enums/appointment_status'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

interface SearchAppointmentsParams {
  tenantId: UUID
  clientIds?: UUID[]
  petIds?: UUID[]
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
      .preload('service')
      .preload('client')
      .preload('pet')
      .preload('agenda')
      .preload('status')
      .orderBy('start_date', 'asc')
      .limit(params.limit)

    if (params.clientIds || params.petIds) {
      query.where((builder) => {
        if (params.clientIds) {
          builder.whereIn('client_id', params.clientIds)
        }

        if (params.petIds) {
          if (params.clientIds) {
            builder.orWhereIn('pet_id', params.petIds)
          } else {
            builder.whereIn('pet_id', params.petIds)
          }
        }
      })
    }

    if (!params.clientIds && !params.petIds && params.search) {
      const ref = `%${params.search}%`
      query.whereILike('booking_ref', ref)
    }

    const appointments = await query

    return { appointments }
  }
}
