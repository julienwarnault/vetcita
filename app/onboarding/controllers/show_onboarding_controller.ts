import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#identity/transformers/user_transformer'

@inject()
export default class ShowOnboardingController {
  async render({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    return inertia.render('onboarding/form', {
      authUser: UserTransformer.transform(user),
    })
  }
}
