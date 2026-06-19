import type { DateTime } from 'luxon'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

interface GetAppointmentsParams {
  tenantId: UUID
  agendaIds?: UUID[]
  from: DateTime
  to: DateTime
}

export class GetAppointments {
  async execute(params: GetAppointmentsParams) {
    const from = params.from.toUTC().toISO()!
    const to = params.to.endOf('day').toUTC().toISO()!

    const query = Appointment.query()
      .where('tenant_id', params.tenantId)
      .where('start_date', '<=', to)
      .where('end_date', '>=', from)
      .orderBy([
        { column: 'start_date', order: 'asc' },
        { column: 'duration', order: 'desc' },
      ])
      .preload('appointmentType')
      .preload('patient')
      .preload('agenda')
      .preload('status')

    if (params.agendaIds?.length) {
      query.whereIn('agenda_id', params.agendaIds)
    }

    const appointments = await query

    return { appointments }
  }
}
