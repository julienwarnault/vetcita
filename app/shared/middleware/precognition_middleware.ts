import { errors } from '@vinejs/vine'
import type { VineValidator } from '@vinejs/vine'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

type ValidationMessage = { field: string; message: string }

export default class PrecognitionMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    ctx.response.vary('X-Inertia, Precognition')

    if (ctx.request.header('precognition') !== 'true') {
      return next()
    }

    ctx.response.header('Precognition', 'true')

    const validator = await this.#resolveValidator(ctx)
    if (!validator) {
      return next()
    }

    try {
      await validator.validate(ctx.request.all())
      return this.#validationPassed(ctx)
    } catch (error) {
      if (!(error instanceof errors.E_VALIDATION_ERROR)) {
        throw error
      }
      return this.#validationFailed(ctx, error.messages as ValidationMessage[])
    }
  }

  #validationFailed(ctx: HttpContext, allMessages: ValidationMessage[]) {
    const validateOnly = this.#validateOnlyFields(ctx)
    const messages = validateOnly.length
      ? allMessages.filter((m) => validateOnly.includes(m.field))
      : allMessages

    if (validateOnly.length && messages.length === 0) {
      return this.#validationPassed(ctx)
    }

    return ctx.response.status(422).send({ errors: this.#groupByField(messages) })
  }

  #validationPassed(ctx: HttpContext) {
    return ctx.response.header('Precognition-Success', 'true').status(204).send('')
  }

  #validateOnlyFields(ctx: HttpContext) {
    return (ctx.request.header('precognition-validate-only') ?? '')
      .split(',')
      .map((field) => field.trim())
      .filter(Boolean)
  }

  #groupByField(messages: ValidationMessage[]) {
    return messages.reduce<Record<string, string[]>>((result, { field, message }) => {
      ;(result[field] ??= []).push(message)
      return result
    }, {})
  }

  async #resolveValidator(ctx: HttpContext): Promise<VineValidator<any, any> | undefined> {
    const handler = ctx.route?.handler as any
    if (!handler || typeof handler === 'function') return undefined

    const reference = handler.reference
    if (!Array.isArray(reference) || typeof reference[0] !== 'function') return undefined

    const module = await reference[0]()
    return module?.default?.validator
  }
}
