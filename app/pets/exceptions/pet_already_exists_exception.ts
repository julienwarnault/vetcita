import { Exception } from '@adonisjs/core/exceptions'

export class PetAlreadyExistsException extends Exception {
  static status = 422
  static code = 'E_PET_ALREADY_EXISTS'

  constructor() {
    super('This pet already exists')
  }
}
