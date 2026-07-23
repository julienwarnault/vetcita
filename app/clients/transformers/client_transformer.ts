import { BaseTransformer } from '@adonisjs/core/transformers'
import type Client from '#clients/models/client'

export default class ClientTransformer extends BaseTransformer<Client> {
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
