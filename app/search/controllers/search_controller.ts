import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import ClientTransformer from '#clients/transformers/client_transformer'
import PetTransformer from '#pets/transformers/pet_transformer'
import { Search } from '#search/actions/search'

@inject()
export default class SearchController {
  constructor(private readonly search: Search) {}

  async render({ request, inertia, tenantId }: HttpContext) {
    const { search, clients, pets, appointments } = await this.search.execute({
      tenantId,
      search: request.input('q', ''),
    })

    return inertia.render('search', {
      search,
      clients: ClientTransformer.transform(clients),
      pets: PetTransformer.transform(pets),
      appointments: AppointmentTransformer.transform(appointments),
    })
  }
}
