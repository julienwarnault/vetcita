import { Exception } from '@adonisjs/core/exceptions'

export class AgendaAlreadyExistsException extends Exception {
  static status = 422
  static code = 'E_AGENDA_ALREADY_EXISTS'

  constructor() {
    super('This agenda already exists')
  }
}
