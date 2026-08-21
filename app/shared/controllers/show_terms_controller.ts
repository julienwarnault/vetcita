import type { HttpContext } from '@adonisjs/core/http'

export default class ShowTermsController {
  async render({ inertia }: HttpContext) {
    return inertia.render('legal/terms', {})
  }
}
