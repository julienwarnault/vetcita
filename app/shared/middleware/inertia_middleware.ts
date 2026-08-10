import type { HttpContext } from '@adonisjs/core/http'
import i18nManager from '@adonisjs/i18n/services/main'
import type { NextFn } from '@adonisjs/core/types/http'
import type { InferSharedProps } from '@adonisjs/inertia/types'
import BaseInertiaMiddleware from '@adonisjs/inertia/inertia_middleware'
import type ClientTransformer from '#clients/transformers/client_transformer'
import UserTransformer from '#identity/transformers/user_transformer'
import type { UUID } from '#shared/types'

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
    const { auth, i18n } = ctx as Partial<HttpContext>

    /**
     * Data shared with all Inertia pages. Make sure you are using
     * transformers for rich data-types like Models.
     */
    return {
      errors: ctx.inertia.always(this.getValidationErrors(ctx)),
      user: ctx.inertia.always(auth?.user ? UserTransformer.transform(auth.user) : undefined),
      qs: ctx.inertia.always(ctx.request.qs()),
      locale: ctx.inertia.always(i18n?.locale ?? i18nManager.defaultLocale),
    }
  }

  flash(ctx: HttpContext) {
    const { session } = ctx as Partial<HttpContext>

    /**
     * Fetching the first error from the flash messages
     */
    return {
      error: session?.flashMessages.get('error') as string | undefined,
      success: session?.flashMessages.get('success') as string | undefined,
      clientId: session?.flashMessages.get('clientId') as UUID | undefined,
      petId: session?.flashMessages.get('petId') as UUID | undefined,
      client: session?.flashMessages.get('client') as ClientTransformer | undefined,
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
  export interface SharedProps extends InferSharedProps<InertiaMiddleware> {}
}
