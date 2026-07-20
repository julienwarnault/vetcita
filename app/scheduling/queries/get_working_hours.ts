import WorkingHour from '#scheduling/models/working_hour'
import type { UUID } from '#shared/types'

interface GetWorkingHoursParams {
  tenantId: UUID
  agendaIds?: UUID[]
  dayOfWeek?: number
}

export class GetWorkingHours {
  async execute(params: GetWorkingHoursParams) {
    const workingHours = await WorkingHour.query()
      .where('tenant_id', params.tenantId)
      .if(params.agendaIds, (q) => q.whereIn('agenda_id', params.agendaIds!))
      .if(params.dayOfWeek, (q) => q.where('day_of_week', params.dayOfWeek!))
      .orderBy('agenda_id')
      .orderBy('day_of_week')
      .orderBy('start_time')

    return { workingHours }
  }
}
