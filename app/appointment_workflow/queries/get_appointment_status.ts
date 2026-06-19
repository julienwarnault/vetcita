import AppointmentStatus from '#appointment_workflow/models/appointment_status'
import type { UUID } from '#app/shared/types'

interface GetAppointmentStatusParams {
  id: string
  tenantId: UUID
}

export class GetAppointmentStatus {
  async execute(params: GetAppointmentStatusParams) {
    const status = await AppointmentStatus.query()
      .where('id', params.id)
      .where((query) => {
        query.where('tenant_id', params.tenantId).orWhereNull('tenant_id')
      })
      .orderBy('sort_order', 'asc')
      .firstOrFail()

    return { status }
  }
}
