import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { withTransaction } from '#shared/utils/with_transaction'
import { ResetPassword } from '#identity/actions/reset_password'
import { passwordSchema } from '#shared/validators'

@inject()
export default class ResetPasswordController {
  static validator = vine.create(
    vine.object({
      token: vine.string(),
      password: passwordSchema().confirmed({ confirmationField: 'passwordConfirmation' }),
    })
  )

  constructor(private readonly resetPassword: ResetPassword) {}

  async render({ inertia, params }: HttpContext) {
    return inertia.render('auth/reset_password', {
      token: params.token,
    })
  }

  async execute({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(ResetPasswordController.validator)

    try {
      await withTransaction(() => {
        return this.resetPassword.execute(payload)
      })

      session.flash('success', 'Tu contraseña ha sido actualizada. Ya puedes iniciar sesión.')

      return response.redirect().toRoute('login.render')
    } catch (error) {
      session.flash('error', 'El enlace para restablecer la contraseña no es válido o ha expirado.')

      return response.redirect().toRoute('forgot_password.render')
    }
  }
}
