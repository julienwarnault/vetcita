import { BaseTransformer } from '@adonisjs/core/transformers'
import type AppointmentStatus from '#appointment_workflow/models/appointment_status'

export default class AppointmentStatusTransformer extends BaseTransformer<AppointmentStatus> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'name',
      'color',
      'icon',
      'isCustom',
      'sortOrder',
      'tenantId',
      'createdAt',
      'updatedAt',
    ])
  }
}
