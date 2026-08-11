import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type Agenda from '#agendas/models/agenda'
import type Tenant from '#tenants/models/tenant'
import type { UUID } from '#shared/types'

export default class RequireTenantMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = await ctx.auth.getUserOrFail()

    await user.load('agenda', (query) => {
      query.preload('tenant')
    })

    if (!user.agenda) {
      return ctx.response.redirect().toRoute('show_onboarding.render')
    }

    ctx.tenantId = user.agenda.tenantId
    ctx.tenant = user.agenda.tenant
    ctx.agenda = user.agenda

    if (!ctx.tenant) {
      throw new Error('Tenant context is required for this route')
    }

    if (ctx.tenant.onboardingStatus === 'pending' && !ctx.request.url().startsWith('/onboarding')) {
      return ctx.response.redirect('/onboarding')
    }

    return next()
  }
}

declare module '@adonisjs/core/http' {
  interface HttpContext {
    agenda: Agenda
    tenant: Tenant
    tenantId: UUID
  }
}
