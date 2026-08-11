import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import UserTransformer from '#identity/transformers/user_transformer'

@inject()
export default class ShowOnboardingController {
  async render({ inertia, auth, tenant }: HttpContext) {
    const user = auth.getUserOrFail()

    return inertia.render('onboarding/form', {
      tenant: tenant ? TenantTransformer.transform(tenant) : undefined,
      authUser: UserTransformer.transform(user),
    })
  }
}
