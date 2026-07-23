import { compose } from '@adonisjs/core/helpers'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { ClientSchema } from '#database/schema'

export default class Client extends compose(ClientSchema, WithPrimaryUuid) {
  get fullName() {
    return this.firstName + ' ' + this.lastName
  }
}
