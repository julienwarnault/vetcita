import { inject } from '@adonisjs/core'
import { transactionContext } from '#shared/contexts/transaction_context'
import User from '#identity/models/user'

interface RegisterUserParams {
  fullName: string
  email: string
  password: string
}

@inject()
export class RegisterUser {
  constructor() {}

  async execute(params: RegisterUserParams): Promise<{ user: User }> {
    const trx = transactionContext.get()

    const user = await User.create(
      {
        fullName: params.fullName,
        email: params.email.trim().toLowerCase(),
        password: params.password,
      },
      { client: trx }
    )

    return { user }
  }
}
