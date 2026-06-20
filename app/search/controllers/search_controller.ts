import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import PatientTransformer from '#patients/transformers/patient_transformer'
import { Search } from '#search/actions/search'

@inject()
export default class SearchController {
  constructor(private readonly search: Search) {}

  async render({ request, inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { search, patients, appointments } = await this.search.execute({
      tenantId: user.tenantId,
      search: request.input('q', ''),
    })

    return inertia.render('search', {
      search,
      patients: PatientTransformer.transform(patients),
      appointments: AppointmentTransformer.transform(appointments),
    })
  }
}
