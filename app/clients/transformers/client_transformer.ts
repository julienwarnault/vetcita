import { BaseTransformer } from '@adonisjs/core/transformers'
import PetTransformer from '#pets/transformers/pet_transformer'
import type Client from '#clients/models/client'

export default class ClientTransformer extends BaseTransformer<Client> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'color',
        'firstName',
        'lastName',
        'fullName',
        'email',
        'phone',
        'notes',
        'createdAt',
        'updatedAt',
      ]),
      pets: PetTransformer.transform(this.whenLoaded(this.resource.pets)),
    }
  }
}
