import { Exception } from '@adonisjs/core/exceptions'

export class SlotNotBookableException extends Exception {
  static status = 422
  static code = 'E_SLOT_NOT_BOOKABLE'

  constructor() {
    super('This slot is no longer bookable')
  }
}
