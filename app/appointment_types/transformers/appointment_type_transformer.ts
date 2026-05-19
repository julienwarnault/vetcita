import { BaseTransformer } from '@adonisjs/core/transformers'
import type AppointmentType from '#appointment_types/models/appointment_type'

export default class AppointmentTypeTransformer extends BaseTransformer<AppointmentType> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'name',
      'color',
      'price',
      'duration',
      'description',
      'tenantId',
      'createdAt',
      'updatedAt',
    ])
  }
}
