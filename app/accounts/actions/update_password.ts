import { inject } from '@adonisjs/core'
import mail from '@adonisjs/mail/services/main'
import PasswordChangedNotification from '#notifications/mails/password_changed_notification'
import { dispatchAfterCommit } from '#shared/utils/dispatch_after_commit'
import { transactionContext } from '#shared/contexts/transaction_context'
import type { UUID } from '#shared/types'
import User from '#identity/models/user'

interface UpdatePasswordParams {
  userId: UUID
  currentPassword: string
  password: string
}

@inject()
export class UpdatePassword {
  async execute(params: UpdatePasswordParams): Promise<{ user: User }> {
    const trx = transactionContext.get()

    const user = await User.query({ client: trx }).where('id', params.userId).firstOrFail()

    await User.verifyCredentials(user.email, params.currentPassword)

    user.password = params.password
    await user.useTransaction(trx!).save()

    await dispatchAfterCommit(async () => {
      await mail.send(new PasswordChangedNotification(user))
    })

    return { user }
  }
}
