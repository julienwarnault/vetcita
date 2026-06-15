import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import PatientTransformer from '#patients/transformers/patient_transformer'
import { GetPatients } from '#patients/queries/get_patients'

@inject()
export default class ListPatientsController {
  constructor(private readonly getPatients: GetPatients) {}

  async render({ request, inertia, auth }: HttpContext) {
    const search = request.input('search', undefined)

    const user = auth.getUserOrFail()

    const { patients } = await this.getPatients.execute({
      tenantId: user.tenantId,
      search,
    })

    return inertia.render('patients/list', {
      patients: PatientTransformer.transform(patients),
    })
  }

  async api({ request, serialize, auth }: HttpContext) {
    const search = request.input('search', undefined)

    const user = auth.getUserOrFail()

    const { patients } = await this.getPatients.execute({
      tenantId: user.tenantId,
      search,
    })

    return serialize.withoutWrapping(PatientTransformer.transform(patients))
  }
}
