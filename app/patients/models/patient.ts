import { compose } from '@adonisjs/core/helpers'
import { WithPrimaryUuid } from '#app/shared/mixins/with_primary_uuid'
import { PatientSchema } from '#database/schema'

export default class Patient extends compose(PatientSchema, WithPrimaryUuid) {
  get fullName() {
    return this.firstName + ' ' + this.lastName
  }
}
