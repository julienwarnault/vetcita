import AppointmentStatus from '#appointment_workflow/models/appointment_status'
import type { UUID } from '#app/shared/types'

interface GetAppointmentStatusesParams {
  tenantId: UUID
}

export class GetAppointmentStatuses {
  async execute(params: GetAppointmentStatusesParams) {
    const statuses = await AppointmentStatus.query()
      .where((query) => {
        query.where('tenant_id', params.tenantId).orWhereNull('tenant_id')
      })
      .orderBy('sort_order', 'asc')

    return { statuses }
  }
}
