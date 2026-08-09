import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import { GetTenant } from '#tenants/queries/get_tenant'

@inject()
export default class ShowTenantController {
  constructor(private readonly getTenant: GetTenant) {}

  async render({ inertia, tenantId }: HttpContext) {
    const { tenant } = await this.getTenant.execute({ id: tenantId })

    return inertia.render('tenants/show', {
      tenant: TenantTransformer.transform(tenant),
    })
  }
}
