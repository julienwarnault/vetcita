import { inject } from '@adonisjs/core'
import { transactionContext } from '#shared/contexts/transaction_context'
import { CreateAgenda } from '#agendas/actions/create_agenda'
import { CreateTenant } from '#tenants/actions/create_tenant'
import User from '#identity/models/user'

interface RegisterUserParams {
  tenantName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

@inject()
export class RegisterUser {
  constructor(
    private readonly createTenant: CreateTenant,
    private readonly createAgenda: CreateAgenda
  ) {}

  async execute(params: RegisterUserParams): Promise<{ user: User }> {
    const trx = transactionContext.get()
    const normalizedEmail = params.email.trim().toLowerCase()

    // Create tenant
    const { tenant } = await this.createTenant.execute({
      name: params.tenantName,
      email: normalizedEmail,
      phone: params.phone,
    })

    // Create user
    const user = await User.create(
      {
        fullName: `${params.firstName} ${params.lastName}`.trim(),
        email: normalizedEmail,
        password: params.password,
      },
      { client: trx }
    )

    // Create agenda
    await this.createAgenda.execute({
      name: `${params.firstName} ${params.lastName}`.trim(),
      email: normalizedEmail,
      color: '#97c6f0',
      tenantId: tenant.id,
      userId: user.id,
      role: 'owner',
      serviceIds: [],
    })

    return { user }
  }
}
