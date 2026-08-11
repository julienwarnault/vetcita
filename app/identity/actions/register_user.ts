import { inject } from '@adonisjs/core'
import { transactionContext } from '#shared/contexts/transaction_context'
import User from '#identity/models/user'

interface RegisterUserParams {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

@inject()
export class RegisterUser {
  constructor() {}

  async execute(params: RegisterUserParams): Promise<{ user: User }> {
    const trx = transactionContext.get()
    const normalizedEmail = params.email.trim().toLowerCase()

    const user = await User.create(
      {
        firstName: params.firstName,
        lastName: params.lastName,
        email: normalizedEmail,
        phone: params.phone,
        password: params.password,
      },
      { client: trx }
    )

    return { user }
  }
}
