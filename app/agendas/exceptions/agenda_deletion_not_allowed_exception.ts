import { Exception } from '@adonisjs/core/exceptions'

export class AgendaDeletionNotAllowedException extends Exception {
  static status = 403
  static code = 'E_AGENDA_DELETION_NOT_ALLOWED'

  constructor() {
    super('Cannot delete this team member')
  }
}
