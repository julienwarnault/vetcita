import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { withTransaction } from '#app/shared/utils/with_transaction'
import { CreatePatient } from '#patients/actions/create_patient'

@inject()
export default class CreatePatientController {
  static validator = vine.create(
    vine.object({
      firstName: vine.string(),
      lastName: vine.string(),
      email: vine.string().email().optional(),
      phone: vine.string().phone(),
      notes: vine.string().optional(),
    })
  )

  constructor(private readonly createPatient: CreatePatient) {}

  async render({ inertia }: HttpContext) {
    return inertia.render('patients/form', {})
  }

  async execute({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(CreatePatientController.validator)

    const user = auth.getUserOrFail()

    await withTransaction(() => {
      return this.createPatient.execute({ ...payload, tenantId: user.tenantId })
    })

    return response.redirect().back()
  }
}
