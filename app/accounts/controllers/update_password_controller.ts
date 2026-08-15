import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { withTransaction } from '#shared/utils/with_transaction'
import { UpdatePassword } from '#accounts/actions/update_password'
import { passwordSchema } from '#shared/validators'

@inject()
export default class UpdatePasswordController {
  static validator = vine.create(
    vine.object({
      currentPassword: passwordSchema(),
      password: passwordSchema().confirmed({ confirmationField: 'passwordConfirmation' }),
    })
  )

  constructor(private readonly updatePassword: UpdatePassword) {}

  async render({ inertia }: HttpContext) {
    return inertia.render('user/update_password', {})
  }

  async execute({ request, response, auth, session }: HttpContext) {
    const payload = await request.validateUsing(UpdatePasswordController.validator)

    try {
      await withTransaction(() => {
        return this.updatePassword.execute({ userId: auth.user!.id, ...payload })
      })

      session.flash('success', 'Tu contraseña ha sido actualizada.')
    } catch (error) {
      session.flash('error', 'No se pudo actualizar la contraseña. Verifica tu contraseña actual.')
    }

    return response.redirect().toRoute('show_account.render')
  }
}
