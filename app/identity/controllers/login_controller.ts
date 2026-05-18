import vine from '@vinejs/vine'
import type { HttpContext } from '@adonisjs/core/http'
import { emailSchema, passwordSchema } from '#app/shared/validators'
import User from '#identity/models/user'

export default class LoginController {
  static validator = vine.create(
    vine.object({
      email: emailSchema(),
      password: passwordSchema(),
    })
  )

  async render({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  async execute({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(LoginController.validator)

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      response.redirect().toRoute('dashboard')
    } catch (error) {
      throw error
    }
  }
}
