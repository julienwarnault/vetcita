import { inject } from '@adonisjs/core'
import { transactionContext } from '#shared/contexts/transaction_context'
import { CreateTenant } from '#tenants/actions/create_tenant'
import { CreateAgenda } from '#agendas/actions/create_agenda'
import Service from '#services/models/service'
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
    const { agenda } = await this.createAgenda.execute({
      name: params.fullName,
      color: '#97c6f0',
      tenantId: tenant.id,
    })

    // Create services
    const services = await Service.createMany(
      [
        { name: 'Consulta general', duration: 30, price: 350, color: '#b8adff', tenantId: tenant.id },
        { name: 'Vacunación', duration: 20, price: 250, color: '#c5e89c', tenantId: tenant.id },
        { name: 'Cirugía', duration: 120, price: 1500, color: '#e85d6f', tenantId: tenant.id },
        { name: 'Baño y estética', duration: 60, price: 350, color: '#f6a2e4', tenantId: tenant.id },
        { name: 'Desparasitación', duration: 15, price: 200, color: '#c5e89c', tenantId: tenant.id },
        { name: 'Emergencia', duration: 60, price: 800, color: '#ffa175', tenantId: tenant.id },
      ],
      { client: trx }
    )

    // Link the default services to the default agenda through the pivot table.
    await agenda.related('services').sync(
      services.map((service) => service.id),
      true,
      trx
    )

    return { user }
  }
}
