import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#identity/transformers/user_transformer'

export default class ShowAccountController {
  async render({ inertia, auth }: HttpContext) {
    return inertia.render('user/account', {
      user: UserTransformer.transform(auth.user!),
    })
  }
}
