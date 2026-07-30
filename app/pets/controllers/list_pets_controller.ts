import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import PetTransformer from '#pets/transformers/pet_transformer'
import { GetClientPets } from '#pets/queries/get_client_pets'
import { GetPets } from '#pets/queries/get_pets'

@inject()
export default class ListPetsController {
  constructor(
    private readonly getPets: GetPets,
    private readonly getClientPets: GetClientPets
  ) {}

  async render({ request, inertia, tenantId }: HttpContext) {
    const search = request.input('search', undefined)

    const { pets } = await this.getPets.execute({ tenantId, search })

    return inertia.render('pets/list', {
      pets: PetTransformer.transform(pets),
    })
  }

  async api({ request, serialize, tenantId }: HttpContext) {
    const clientId = request.input('clientId', undefined)

    const { pets } = await this.getClientPets.execute({
      tenantId,
      clientId,
    })

    return serialize.withoutWrapping(PetTransformer.transform(pets))
  }
}
