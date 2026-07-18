import { BaseTransformer } from '@adonisjs/core/transformers'
import type ClosedDate from '#scheduling/models/closed_date'

export default class ClosedDateTransformer extends BaseTransformer<ClosedDate> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'description', 'tenantId', 'createdAt', 'updatedAt']),
      start: this.resource.start.toFormat('yyyy-MM-dd'),
      end: this.resource.end.toFormat('yyyy-MM-dd'),
    }
  }
}
