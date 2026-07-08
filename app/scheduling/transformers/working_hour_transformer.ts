import { BaseTransformer } from '@adonisjs/core/transformers'
import type WorkingHour from '#scheduling/models/working_hour'

export default class WorkingHourTransformer extends BaseTransformer<WorkingHour> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'dayOfWeek',
      'startTime',
      'endTime',
      'agendaId',
      'tenantId',
      'createdAt',
      'updatedAt',
    ])
  }
}
