import { AppointmentStatus } from '#appointment_workflow/enums/appointment_status'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

interface GetAllAppointmentsParams {
  tenantId: UUID
  search?: string
  agendaIds?: UUID[]
  statusId?: string
}

export class GetAllAppointments {
  async execute(params: GetAllAppointmentsParams) {
    const query = Appointment.query()
      .where('tenant_id', params.tenantId)
      .whereNot('status_id', AppointmentStatus.CANCELLED)
      .orderBy('start_date', 'desc')
      .preload('service')
      .preload('client')
      .preload('pet', (petQuery) => petQuery.preload('species'))
      .preload('agenda')
      .preload('status')

    if (params.search) {
      const term = `%${params.search}%`

      query.whereILike('booking_ref', term)
    }

    if (params.agendaIds?.length) {
      query.whereIn('agenda_id', params.agendaIds)
    }

    if (params.statusId) {
      query.where('status_id', params.statusId)
    }

    const appointments = await query

    return { appointments }
  }
}
