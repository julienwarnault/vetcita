import type { HttpContext } from '@adonisjs/core/http'
import i18nManager from '@adonisjs/i18n/services/main'
import type { NextFn } from '@adonisjs/core/types/http'
import BaseInertiaMiddleware from '@adonisjs/inertia/inertia_middleware'
import UserTransformer from '#identity/transformers/user_transformer'

export default class InertiaMiddleware extends BaseInertiaMiddleware {
  share(ctx: HttpContext) {
    /**
     * The share method is called everytime an Inertia page is rendered. In
     * certain cases, a page may get rendered before the session middleware
     * or the auth middleware are executed. For example: During a 404 request.
     *
     * In that case, we must always assume that HttpContext is not fully hydrated
     * with all the properties
     */
    const { session, auth, i18n } = ctx as Partial<HttpContext>

    /**
     * Data shared with all Inertia pages. Make sure you are using
     * transformers for rich data-types like Models.
     */
    return {
      errors: ctx.inertia.always(this.getValidationErrors(ctx)),
      flash: ctx.inertia.always(session?.flashMessages.all()),
      user: ctx.inertia.always(auth?.user ? UserTransformer.transform(auth.user) : undefined),
      qs: ctx.inertia.always(ctx.request.qs()),
      locale: ctx.inertia.always(i18n?.locale ?? i18nManager.defaultLocale),
    }
  }

  async handle(ctx: HttpContext, next: NextFn) {
    await this.init(ctx)

    const output = await next()
    this.dispose(ctx)

    return output
  }
}

declare module '@adonisjs/inertia/types' {
  type MiddlewareSharedProps = InferSharedProps<InertiaMiddleware>
  export interface SharedProps extends MiddlewareSharedProps {}
}
