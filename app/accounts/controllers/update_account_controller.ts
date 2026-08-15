import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { withTransaction } from '#shared/utils/with_transaction'
import { UpdateAccount } from '#accounts/actions/update_account'
import { emailSchema } from '#shared/validators'

@inject()
export default class UpdateAccountController {
  static validator = vine.create(
    vine.object({
      firstName: vine.string(),
      lastName: vine.string(),
      email: emailSchema(),
      phone: vine.string().phone(),
    })
  )

  constructor(private readonly updateAccount: UpdateAccount) {}

  async execute({ request, response, auth, session }: HttpContext) {
    const payload = await request.validateUsing(UpdateAccountController.validator)

    try {
      await withTransaction(() => {
        return this.updateAccount.execute({ userId: auth.user!.id, ...payload })
      })

      session.flash('success', 'Tus datos han sido actualizados.')
    } catch (error) {
      session.flash('error', 'No se pudieron actualizar tus datos. Verifica que el correo no esté en uso.')
    }

    return response.redirect().toRoute('show_account.render')
  }
}
