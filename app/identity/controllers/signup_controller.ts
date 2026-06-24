import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { withTransaction } from '#shared/utils/with_transaction'
import { emailSchema, passwordSchema } from '#shared/validators'
import { RegisterUser } from '#identity/actions/register_user'

@inject()
export default class SignupController {
  static validator = vine.create(
    vine.object({
      fullName: vine.string(),
      tenantName: vine.string(),
      email: emailSchema(),
      password: passwordSchema().confirmed({ confirmationField: 'passwordConfirmation' }),
    })
  )

  constructor(private readonly registerUser: RegisterUser) {}

  async render({ inertia }: HttpContext) {
    return inertia.render('auth/signup', {})
  }

  async execute({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(SignupController.validator)

    const { user } = await withTransaction(() => {
      return this.registerUser.execute(payload)
    })

    await auth.use('web').login(user)
    response.redirect().toRoute('dashboard.render')
  }
}
