import { BaseMail } from '@adonisjs/mail'
import { signedUrlFor } from '@adonisjs/core/services/url_builder'
import type User from '#identity/models/user'
import { appUrl } from '#config/app'

export default class PasswordResetTokenNotification extends BaseMail {
  constructor(
    private user: User,
    private token: string
  ) {
    super()
  }

  prepare() {
    const resetUrl = signedUrlFor('reset_password.render', { token: this.token }, { prefixUrl: appUrl })

    this.message.to(this.user.email).subject('Restablecer tu contraseña').htmlView('emails/password_reset_token', {
      user: this.user,
      resetUrl,
    })
  }
}
