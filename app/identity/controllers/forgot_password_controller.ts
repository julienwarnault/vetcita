import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { withTransaction } from '#shared/utils/with_transaction'
import { RequestPasswordReset } from '#identity/actions/request_password_reset'
import { emailSchema } from '#shared/validators'

@inject()
export default class ForgotPasswordController {
  static validator = vine.create(
    vine.object({
      email: emailSchema(),
    })
  )

  constructor(private readonly requestPasswordReset: RequestPasswordReset) {}

  async render({ inertia }: HttpContext) {
    return inertia.render('auth/forgot_password', {})
  }

  async execute({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(ForgotPasswordController.validator)

    await withTransaction(() => {
      return this.requestPasswordReset.execute(payload)
    })

    session.flash(
      'success',
      'Si existe una cuenta asociada a este correo, recibirás un enlace para restablecer tu contraseña.'
    )

    return response.redirect().toRoute('forgot_password.render')
  }
}
