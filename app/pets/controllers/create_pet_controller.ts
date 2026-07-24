import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ClientTransformer from '#clients/transformers/client_transformer'
import SpeciesTransformer from '#pets/transformers/species_transformer'
import BreedTransformer from '#pets/transformers/breed_transformer'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetClient } from '#clients/queries/get_client'
import { GetSpecies } from '#pets/queries/get_species'
import { CreatePet } from '#pets/actions/create_pet'
import { GetBreeds } from '#pets/queries/get_breeds'
import { uuidSchema } from '#shared/validators'

@inject()
export default class CreatePetController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      clientId: uuidSchema(),
      dateOfBirth: vine.date().optional(),
      gender: vine.enum(['male', 'female', 'unknown']).optional(),
      speciesId: uuidSchema(),
      breedId: uuidSchema().optional(),
      notes: vine.string().optional(),
    })
  )

  constructor(
    private readonly getBreeds: GetBreeds,
    private readonly getSpecies: GetSpecies,
    private readonly getClient: GetClient,
    private readonly createPet: CreatePet
  ) {}

  async render({ inertia, auth, request }: HttpContext) {
    const clientId = request.input('clientId', null)

    const user = auth.getUserOrFail()

    const [{ species }, { breeds }, { client }] = await Promise.all([
      this.getSpecies.execute(),
      this.getBreeds.execute({}),
      clientId ? this.getClient.execute({ id: clientId, tenantId: user.tenantId }) : { client: null },
    ])

    return inertia.render('pets/form', {
      client: ClientTransformer.transform(client) ?? undefined,
      species: SpeciesTransformer.transform(species),
      breeds: BreedTransformer.transform(breeds),
    })
  }

  async execute({ request, response, auth, session }: HttpContext) {
    const payload = await request.validateUsing(CreatePetController.validator)

    const user = auth.getUserOrFail()

    const { pet } = await withTransaction(() => {
      return this.createPet.execute({ ...payload, tenantId: user.tenantId })
    })

    session.flash('petId', pet.id)

    return response.redirect().back()
  }
}
