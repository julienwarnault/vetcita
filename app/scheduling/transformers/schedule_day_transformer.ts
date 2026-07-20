import { BaseTransformer } from '@adonisjs/core/transformers'
import type ScheduleDay from '#scheduling/models/schedule_day'

export default class ScheduleDayTransformer extends BaseTransformer<ScheduleDay> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'shifts', 'agendaId', 'tenantId', 'createdAt', 'updatedAt']),
      date: this.resource.date.toFormat('yyyy-MM-dd'),
    }
  }
}
