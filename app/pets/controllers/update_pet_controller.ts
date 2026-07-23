import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import SpeciesTransformer from '#pets/transformers/species_transformer'
import BreedTransformer from '#pets/transformers/breed_transformer'
import { withTransaction } from '#shared/utils/with_transaction'
import PetTransformer from '#pets/transformers/pet_transformer'
import { GetSpecies } from '#pets/queries/get_species'
import { GetBreeds } from '#pets/queries/get_breeds'
import { UpdatePet } from '#pets/actions/update_pet'
import { uuidSchema } from '#shared/validators'
import { GetPet } from '#pets/queries/get_pet'

@inject()
export default class UpdatePetController {
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
    private readonly getPet: GetPet,
    private readonly updatePet: UpdatePet
  ) {}

  async render({ inertia, auth, params }: HttpContext) {
    const user = auth.getUserOrFail()

    const [{ pet }, { species }, { breeds }] = await Promise.all([
      this.getPet.execute({ id: params.id, tenantId: user.tenantId }),
      this.getSpecies.execute(),
      this.getBreeds.execute({}),
    ])

    return inertia.render('pets/form', {
      pet: PetTransformer.transform(pet),
      species: SpeciesTransformer.transform(species),
      breeds: BreedTransformer.transform(breeds),
    })
  }

  async execute({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(UpdatePetController.validator)

    await withTransaction(() => {
      return this.updatePet.execute({ id: params.id, ...payload })
    })

    return response.redirect().back()
  }
}
