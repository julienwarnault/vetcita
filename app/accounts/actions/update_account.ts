import { inject } from '@adonisjs/core'
import { transactionContext } from '#shared/contexts/transaction_context'
import type { UUID } from '#shared/types'
import User from '#identity/models/user'

interface UpdateAccountParams {
  userId: UUID
  firstName: string
  lastName: string
  email: string
  phone: string
}

@inject()
export class UpdateAccount {
  async execute(params: UpdateAccountParams): Promise<{ user: User }> {
    const trx = transactionContext.get()
    const email = params.email.trim().toLowerCase()

    const emailAlreadyUsed = await User.query({ client: trx })
      .where('email', email)
      .whereNot('id', params.userId)
      .first()

    if (emailAlreadyUsed) {
      throw new Error('Email already used')
    }

    const user = await User.query({ client: trx }).where('id', params.userId).firstOrFail()

    user.merge({
      firstName: params.firstName,
      lastName: params.lastName,
      email,
      phone: params.phone,
    })

    await user.useTransaction(trx!).save()

    return { user }
  }
}
