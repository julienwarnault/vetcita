import { Exception } from '@adonisjs/core/exceptions'

export class SpeciesNotSupportedException extends Exception {
  static status = 422
  static code = 'E_SPECIES_NOT_SUPPORTED'

  constructor() {
    super('This species is not supported by this clinic')
  }
}
