import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import ServiceTransformer from '#services/transformers/service_transformer'
import { GetServices } from '#services/queries/get_services'

@inject()
export default class ShowOnboardingController {
  constructor(private readonly getServices: GetServices) {}

  async render({ inertia, tenant, response }: HttpContext) {
    if (tenant.onboardingStatus === 'completed') {
      return response.redirect().toRoute('dashboard.render')
    }

    const { services } = await this.getServices.execute({ tenantId: tenant.id })

    return inertia.render('onboarding/form', {
      tenant: TenantTransformer.transform(tenant),
      services: ServiceTransformer.transform(services),
    })
  }
}
