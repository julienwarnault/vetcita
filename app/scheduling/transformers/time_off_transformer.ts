import { BaseTransformer } from '@adonisjs/core/transformers'
import type TimeOff from '#scheduling/models/time_off'

export default class TimeOffTransformer extends BaseTransformer<TimeOff> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'description',
        'type',
        'startTime',
        'endTime',
        'agendaId',
        'tenantId',
        'createdAt',
        'updatedAt',
      ]),
      start: this.resource.start.toFormat('yyyy-MM-dd'),
      end: this.resource.end.toFormat('yyyy-MM-dd'),
    }
  }
}
