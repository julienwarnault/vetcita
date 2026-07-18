import { BaseTransformer } from '@adonisjs/core/transformers'
import type { Shift } from '#scheduling/services/shift_builder'

export default class ShiftTransformer extends BaseTransformer<Shift> {
  toObject() {
    return this.pick(this.resource, ['agendaId', 'date', 'start', 'end'])
  }
}
