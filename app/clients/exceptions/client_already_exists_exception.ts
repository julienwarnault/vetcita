import { Exception } from '@adonisjs/core/exceptions'

export class ClientAlreadyExistsException extends Exception {
  static status = 422
  static code = 'E_CLIENT_ALREADY_EXISTS'

  constructor() {
    super('This client already exists')
  }
}
