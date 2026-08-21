import type { HttpContext } from '@adonisjs/core/http'

export default class ShowPrivacyPolicyController {
  async render({ inertia }: HttpContext) {
    return inertia.render('legal/privacy_policy', {})
  }
}
