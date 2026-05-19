import { BaseTransformer } from '@adonisjs/core/transformers'
import type Patient from '#patients/models/patient'

export default class PatientTransformer extends BaseTransformer<Patient> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'firstName',
      'lastName',
      'fullName',
      'email',
      'phone',
      'notes',
      'createdAt',
      'updatedAt',
    ])
  }
}
