import { inject } from '@adonisjs/core'
import string from '@adonisjs/core/helpers/string'
import { UpdateWorkingHours } from '#scheduling/actions/update_working_hours'
import { transactionContext } from '#shared/contexts/transaction_context'
import Service from '#services/models/service'
import Tenant from '#tenants/models/tenant'
import Agenda from '#agendas/models/agenda'
import type { UUID } from '#shared/types'

interface CompleteOnboardingParams {
  tenantId: UUID
  name: string
  email?: string
  phone?: string
  website?: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
  countryCode?: string
}

@inject()
export class CompleteOnboarding {
  constructor(private readonly updateWorkingHours: UpdateWorkingHours) {}

  async execute(params: CompleteOnboardingParams) {
    const trx = transactionContext.get()

    const tenant = await Tenant.findOrFail(params.tenantId, { client: trx })
    const agendas = await Agenda.query({ client: trx }).where('tenantId', params.tenantId)

    // Opening hours
    const openingHours = [1, 2, 3, 4, 5, 6].map((dayOfWeek) => [
      { startTime: '09:00', endTime: dayOfWeek === 6 ? '14:00' : '18:00' },
    ])

    // Update tenant
    tenant.merge({
      name: params.name,
      slug: string.slug(params.name),
      email: params.email?.trim().toLowerCase() || null,
      phone: params.phone || null,
      website: params.website || null,
      address: params.address || null,
      city: params.city || null,
      state: params.state || null,
      postalCode: params.postalCode || null,
      countryCode: params.countryCode || 'MX',
      openingHours: openingHours,
      onboardingStatus: 'completed',
    })

    await tenant.useTransaction(trx!).save()

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

    // Sync services
    const serviceIds = services.map((service) => service.id)
    await Promise.all(agendas.map((agenda) => agenda.related('services').sync(serviceIds, true, trx)))

    // Sync week shifts
    await Promise.all(
      agendas.map((agenda) =>
        this.updateWorkingHours.execute({ agendaId: agenda.id, tenantId: agenda.tenantId, weekShifts: openingHours })
      )
    )

    return { tenant }
  }
}
