import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import SpeciesTransformer from '#pets/transformers/species_transformer'
import { GetTenantSpecies } from '#pets/queries/get_tenant_species'
import { withTransaction } from '#shared/utils/with_transaction'
import PetTransformer from '#pets/transformers/pet_transformer'
import { UpdatePet } from '#pets/actions/update_pet'
import { uuidSchema } from '#shared/validators'
import { GetPet } from '#pets/queries/get_pet'
import { UUID } from '#shared/types'

@inject()
export default class UpdatePetController {
  static validator = vine.withMetaData<{ tenantId: UUID; petId: UUID }>().create(
    vine.object({
      name: vine.string().unique({
        table: 'pets',
        caseInsensitive: true,
        filter: (db, _, field) => {
          db.where('tenant_id', field.meta.tenantId)
          db.andWhere('client_id', field.data.clientId)
          db.andWhereNot('id', field.meta.petId)
        },
      }),
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
    private readonly getTenantSpecies: GetTenantSpecies,
    private readonly getPet: GetPet,
    private readonly updatePet: UpdatePet
  ) {}

  async render({ inertia, tenantId, params }: HttpContext) {
    const [{ pet }, { species }] = await Promise.all([
      this.getPet.execute({ id: params.id, tenantId }),
      this.getTenantSpecies.execute({ tenantId }),
    ])

    const speciesOptions = species.some((item) => item.id === pet.speciesId) ? species : [...species, pet.species]

    return inertia.render('pets/form', {
      pet: PetTransformer.transform(pet),
      species: SpeciesTransformer.transform(speciesOptions),
    })
  }

  async execute({ request, params, response, tenantId }: HttpContext) {
    const payload = await request.validateUsing(UpdatePetController.validator, { meta: { tenantId, petId: params.id } })

    await withTransaction(() => {
      return this.updatePet.execute({ id: params.id, tenantId, ...payload })
    })

    return response.redirect().back()
  }
}
