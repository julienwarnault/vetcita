import WorkingHour from '#scheduling/models/working_hour'
import type { UUID } from '#shared/types'

interface GetWorkingHoursParams {
  tenantId: UUID
  agendaIds: UUID[]
}

export class GetWorkingHours {
  async execute(params: GetWorkingHoursParams) {
    const workingHours = await WorkingHour.query()
      .where('tenant_id', params.tenantId)
      .whereIn('agenda_id', params.agendaIds!)

    return { workingHours }
  }
}
