import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import mail from '@adonisjs/mail/services/main'
import PasswordResetTokenNotification from '#notifications/mails/password_reset_token_notification'
import { dispatchAfterCommit } from '#shared/utils/dispatch_after_commit'
import { transactionContext } from '#shared/contexts/transaction_context'
import PasswordResetToken from '#identity/models/password_reset_token'
import User from '#identity/models/user'

interface RequestPasswordResetParams {
  email: string
}

@inject()
export class RequestPasswordReset {
  async execute(params: RequestPasswordResetParams) {
    const trx = transactionContext.get()
    const email = params.email.trim().toLowerCase()

    const user = await User.query({ client: trx }).where('email', email).first()

    if (!user) {
      return
    }

    const token = crypto.randomBytes(32).toString('hex')
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')

    await PasswordResetToken.query({ client: trx }).where('userId', user.id).delete()

    await PasswordResetToken.create(
      {
        userId: user.id,
        token: tokenHash,
        expiresAt: DateTime.now().plus({ hours: 1 }),
      },
      { client: trx }
    )

    await dispatchAfterCommit(async () => {
      await mail.send(new PasswordResetTokenNotification(user, token))
    })
  }
}
