import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ConsultationTransformer from '#medical_records/transformers/consultation_transformer'
import { GetConsultations } from '#medical_records/queries/get_consultations'

@inject()
export default class ListConsultationsController {
  constructor(private readonly getConsultations: GetConsultations) {}

  async render({ request, inertia, tenantId }: HttpContext) {
    const search = request.input('search', undefined)
    const { consultations } = await this.getConsultations.execute({
      tenantId,
      search,
    })

    return inertia.render('consultations/list', {
      consultations: ConsultationTransformer.transform(consultations),
    })
  }
}
