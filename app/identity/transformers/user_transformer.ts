import { BaseTransformer } from '@adonisjs/core/transformers'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import type User from '#identity/models/user'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'fullName', 'email', 'createdAt', 'updatedAt']),
      agenda: AgendaTransformer.transform(this.whenLoaded(this.resource.agenda))?.depth(2),
    }
  }
}
