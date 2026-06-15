import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import PatientTransformer from '#patients/transformers/patient_transformer'
import { withTransaction } from '#app/shared/utils/with_transaction'
import { UpdatePatient } from '#patients/actions/update_patient'
import { GetPatient } from '#patients/queries/get_patient'

@inject()
export default class UpdatePatientController {
  static validator = vine.create(
    vine.object({
      firstName: vine.string(),
      lastName: vine.string(),
      email: vine.string().email().optional(),
      phone: vine.string().phone(),
      notes: vine.string().optional(),
    })
  )

  constructor(
    private readonly getPatient: GetPatient,
    private readonly updatePatient: UpdatePatient
  ) {}

  async render({ inertia, params }: HttpContext) {
    const { patient } = await this.getPatient.execute({ id: params.id })

    return inertia.render('patients/form', {
      patient: PatientTransformer.transform(patient),
    })
  }

  async execute({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(UpdatePatientController.validator)

    await withTransaction(() => {
      return this.updatePatient.execute({ id: params.id, ...payload })
    })

    return response.redirect().back()
  }
}
