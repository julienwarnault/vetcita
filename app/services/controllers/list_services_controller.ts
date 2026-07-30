import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ServiceTransformer from '#services/transformers/service_transformer'
import { GetServices } from '#services/queries/get_services'

@inject()
export default class ListServicesController {
  constructor(private readonly getServices: GetServices) {}

  async render({ request, inertia, tenantId }: HttpContext) {
    const search = request.input('search', undefined)

    const { services } = await this.getServices.execute({
      tenantId,
      search,
    })

    return inertia.render('services/list', {
      services: ServiceTransformer.transform(services),
    })
  }
}
