import { BaseMail } from '@adonisjs/mail'
import type User from '#identity/models/user'

export default class PasswordChangedNotification extends BaseMail {
  constructor(private user: User) {
    super()
  }

  prepare() {
    this.message.to(this.user.email).subject('Tu contraseña ha sido actualizada').htmlView('emails/password_changed', {
      user: this.user,
    })
  }
}
