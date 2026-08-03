import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { CompleteOnboarding } from '#onboarding/actions/complete_onboarding'
import { withTransaction } from '#shared/utils/with_transaction'
import { emailSchema } from '#shared/validators'

@inject()
export default class UpdateOnboardingController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      email: emailSchema().optional(),
      phone: vine.string().phone(),
      website: vine.string().url({ require_protocol: false }).optional(),
      address: vine.string().optional(),
      city: vine.string().optional(),
      state: vine.string().optional(),
      postalCode: vine.string().optional(),
      countryCode: vine.string().fixedLength(2).optional(),
    })
  )

  constructor(private readonly completeOnboarding: CompleteOnboarding) {}

  async execute({ request, response, tenantId }: HttpContext) {
    const payload = await request.validateUsing(UpdateOnboardingController.validator)

    await withTransaction(() => {
      return this.completeOnboarding.execute({ tenantId, ...payload })
    })

    return response.redirect().toRoute('dashboard.render')
  }
}
