import { inject } from '@adonisjs/core'
import { transactionContext } from '#shared/contexts/transaction_context'
import { CreateTenant } from '#app/tenants/actions/create_tenant'
import { CreateAgenda } from '#agendas/actions/create_agenda'
import User from '#identity/models/user'

interface RegisterUserParams {
  fullName: string
  email: string
  password: string
  tenantName: string
}

@inject()
export class RegisterUser {
  constructor(
    private readonly createTenant: CreateTenant,
    private readonly createAgenda: CreateAgenda
  ) {}

  async execute(params: RegisterUserParams): Promise<{ user: User }> {
    const trx = transactionContext.get()

    // Create tenant
    const { tenant } = await this.createTenant.execute({
      name: params.tenantName,
    })

    // Create user
    const user = await User.create(
      {
        fullName: params.fullName,
        email: params.email.trim().toLowerCase(),
        password: params.password,
        tenantId: tenant.id,
      },
      { client: trx }
    )

    // Create agenda
    await this.createAgenda.execute({
      name: params.fullName,
      color: '#97c6f0',
      tenantId: tenant.id,
    })

    return { user }
  }
}
