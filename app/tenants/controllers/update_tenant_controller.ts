import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import { withTransaction } from '#shared/utils/with_transaction'
import { UpdateTenant } from '#tenants/actions/update_tenant'
import { GetTenant } from '#tenants/queries/get_tenant'

@inject()
export default class UpdateTenantController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      phone: vine.string().phone().optional(),
      website: vine.string().url({ require_protocol: false }).optional(),
    })
  )

  constructor(
    private readonly getTenant: GetTenant,
    private readonly updateTenant: UpdateTenant
  ) {}

  async render({ inertia, tenantId }: HttpContext) {
    const { tenant } = await this.getTenant.execute({ id: tenantId })

    return inertia.render('tenants/form', {
      tenant: TenantTransformer.transform(tenant),
    })
  }

  async execute({ request, response, tenantId }: HttpContext) {
    const payload = await request.validateUsing(UpdateTenantController.validator)

    await withTransaction(() => {
      return this.updateTenant.execute({ id: tenantId, ...payload })
    })

    return response.redirect().toRoute('settings')
  }
}
