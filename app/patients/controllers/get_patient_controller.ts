import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import PatientTransformer from '#patients/transformers/patient_transformer'
import { GetPatient } from '#patients/queries/get_patient'

@inject()
export default class ShowPatientController {
  constructor(private readonly getPatient: GetPatient) {}

  async render({ inertia, params }: HttpContext) {
    const { patient } = await this.getPatient.execute({
      id: params.id,
    })

    return inertia.render('patients/show', {
      patient: PatientTransformer.transform(patient),
    })
  }
}
