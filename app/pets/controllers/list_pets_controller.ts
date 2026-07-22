import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import PetTransformer from '#pets/transformers/pet_transformer'
import { GetPets } from '#pets/queries/get_pets'

@inject()
export default class ListPetsController {
  constructor(private readonly getPets: GetPets) {}

  async render({ request, inertia, auth }: HttpContext) {
    const search = request.input('search', undefined)

    const user = auth.getUserOrFail()

    const { pets } = await this.getPets.execute({ tenantId: user.tenantId, search })

    return inertia.render('pets/list', {
      pets: PetTransformer.transform(pets),
    })
  }
}
