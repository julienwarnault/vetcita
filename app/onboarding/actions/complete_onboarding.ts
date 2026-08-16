import { inject } from '@adonisjs/core'
import { transactionContext } from '#shared/contexts/transaction_context'
import { CreateAgenda } from '#agendas/actions/create_agenda'
import Location from '#tenants/models/location'
import Service from '#services/models/service'
import Tenant from '#tenants/models/tenant'
import type { UUID } from '#shared/types'
import User from '#identity/models/user'

interface CompleteOnboardingParams {
  userId: UUID
  name: string
  phone: string
  email?: string
  website?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
  countryCode?: string
  speciesIds: UUID[]
}

@inject()
export class CompleteOnboarding {
  constructor(private readonly createAgenda: CreateAgenda) {}

  async execute(params: CompleteOnboardingParams) {
    const trx = transactionContext.get()

    const user = await User.findOrFail(params.userId, { client: trx })

    // Opening hours
    const openingHours = [1, 2, 3, 4, 5, 6].map((dayOfWeek) => [
      { startTime: '09:00', endTime: dayOfWeek === 6 ? '14:00' : '18:00' },
    ])

    // Create tenant
    const tenant = await Tenant.create(
      {
        name: params.name,
        email: params.email?.trim().toLowerCase() || null,
        phone: params.phone || null,
        onboardingStatus: 'completed',
      },
      { client: trx }
    )

    // Create location
    const location = await Location.create(
      {
        tenantId: tenant.id,
        name: params.name,
        email: params.email?.trim().toLowerCase(),
        phone: params.phone,
        website: params.website,
        address: params.address,
        city: params.city,
        state: params.state,
        postalCode: params.postalCode,
        countryCode: params.countryCode || 'MX',
        openingHours: openingHours,
      },
      { client: trx }
    )

    // Sync species
    await location.related('species').sync(params.speciesIds, true, trx)

    // Create services
    const services = await Service.createMany(
      [
        { name: 'Consulta general', duration: 30, price: 350, color: '#b8adff', tenantId: tenant.id },
        { name: 'Vacunación', duration: 20, price: 250, color: '#c5e89c', tenantId: tenant.id },
        { name: 'Cirugía', duration: 120, price: 1500, color: '#e85d6f', tenantId: tenant.id },
        { name: 'Baño y estética', duration: 60, price: 350, color: '#f6a2e4', tenantId: tenant.id },
        { name: 'Desparasitación', duration: 15, price: 200, color: '#97c6f0', tenantId: tenant.id },
        { name: 'Emergencia', duration: 60, price: 800, color: '#ffa175', tenantId: tenant.id },
      ],
      { client: trx }
    )

    // Create agenda
    await this.createAgenda.execute({
      userId: user.id,
      tenantId: tenant.id,
      firstName: user.firstName,
      lastName: user.lastName ?? undefined,
      email: user.email,
      role: 'owner',
      color: '#97c6f0',
      serviceIds: services.map((service) => service.id),
    })

    return { tenant }
  }
}
