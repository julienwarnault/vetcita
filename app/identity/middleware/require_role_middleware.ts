import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { AgendaRole } from '#agendas/models/agenda'

/**
 * Restricts route access to agenda with specific roles.
 */
export default class RequireRoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, options: { roles: AgendaRole[] }) {
    if (!options.roles.some((role) => role === ctx.agenda.role)) {
      return ctx.response.unauthorized('Not authorized to access this route')
    }

    return next()
  }
}
