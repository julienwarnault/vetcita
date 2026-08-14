import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import mail from '@adonisjs/mail/services/main'
import PasswordChangedNotification from '#notifications/mails/password_changed_notification'
import { dispatchAfterCommit } from '#shared/utils/dispatch_after_commit'
import { transactionContext } from '#shared/contexts/transaction_context'
import PasswordResetToken from '#identity/models/password_reset_token'

interface ResetPasswordParams {
  token: string
  password: string
}

@inject()
export class ResetPassword {
  async execute(params: ResetPasswordParams) {
    const trx = transactionContext.get()
    const tokenHash = crypto.createHash('sha256').update(params.token).digest('hex')

    const resetToken = await PasswordResetToken.query({ client: trx })
      .where('token', tokenHash)
      .where('expiresAt', '>', DateTime.now().toSQL()!)
      .preload('user')
      .firstOrFail()

    resetToken.user.password = params.password
    await resetToken.user.useTransaction(trx!).save()

    await PasswordResetToken.query({ client: trx }).where('userId', resetToken.userId).delete()

    await dispatchAfterCommit(async () => {
      await mail.send(new PasswordChangedNotification(resetToken.user))
    })

    return { user: resetToken.user }
  }
}
