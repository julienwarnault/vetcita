import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ShowSettingsController {
  async render({ inertia }: HttpContext) {
    return inertia.render('settings/show', {})
  }
}
