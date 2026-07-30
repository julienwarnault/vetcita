import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import SpeciesTransformer from '#pets/transformers/species_transformer'
import { withTransaction } from '#shared/utils/with_transaction'
import PetTransformer from '#pets/transformers/pet_transformer'
import { GetSpecies } from '#pets/queries/get_species'
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
      isNeutered: vine.boolean().optional(),
      speciesId: uuidSchema(),
      breed: vine.string().optional(),
      color: vine.string().optional(),
      weight: vine.number().positive().optional(),
      bloodType: vine.string().optional(),
      allergies: vine.string().optional(),
      notes: vine.string().optional(),
    })
  )

  constructor(
    private readonly getSpecies: GetSpecies,
    private readonly getPet: GetPet,
    private readonly updatePet: UpdatePet
  ) {}

  async render({ inertia, tenantId, params }: HttpContext) {
    const [{ pet }, { species }] = await Promise.all([
      this.getPet.execute({ id: params.id, tenantId }),
      this.getSpecies.execute(),
    ])

    return inertia.render('pets/form', {
      pet: PetTransformer.transform(pet),
      species: SpeciesTransformer.transform(species),
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
