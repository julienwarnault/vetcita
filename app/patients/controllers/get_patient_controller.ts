import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import PatientTransformer from '#patients/transformers/patient_transformer'
import { GetPatient } from '#patients/queries/get_patient'

@inject()
export default class ShowPatientController {
  constructor(private readonly getPatient: GetPatient) {}

  async render({ inertia, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { patient } = await this.getPatient.execute({
      id: params.id,
      tenantId: user.tenantId,
    })

    return inertia.render('patients/show', {
      patient: PatientTransformer.transform(patient),
    })
  }

  async api({ serialize, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { patient } = await this.getPatient.execute({
      id: params.id,
      tenantId: user.tenantId,
    })

    return await serialize.withoutWrapping(PatientTransformer.transform(patient))
  }
}
