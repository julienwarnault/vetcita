import { inject } from '@adonisjs/core'
import { transactionContext } from '#shared/contexts/transaction_context'
import { CreateTenant } from '#app/tenants/actions/create_tenant'
import User from '#identity/models/user'

interface RegisterUserParams {
  fullName: string
  email: string
  password: string
  tenantName: string
}

@inject()
export class RegisterUser {
  constructor(private readonly createTenant: CreateTenant) {}

  async execute(params: RegisterUserParams): Promise<{ user: User }> {
    const trx = transactionContext.get()

    const { tenant } = await this.createTenant.execute({
      name: params.tenantName,
    })

    const user = await User.create(
      {
        fullName: params.fullName,
        email: params.email.trim().toLowerCase(),
        password: params.password,
        tenantId: tenant.id,
      },
      { client: trx }
    )

    return { user }
  }
}
