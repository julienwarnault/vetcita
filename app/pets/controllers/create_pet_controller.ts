import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ClientTransformer from '#clients/transformers/client_transformer'
import SpeciesTransformer from '#pets/transformers/species_transformer'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetClient } from '#clients/queries/get_client'
import { GetSpecies } from '#pets/queries/get_species'
import { CreatePet } from '#pets/actions/create_pet'
import { uuidSchema } from '#shared/validators'
import { UUID } from '#shared/types'

@inject()
export default class CreatePetController {
  static validator = vine.withMetaData<{ tenantId: UUID }>().create(
    vine.object({
      name: vine.string().unique({
        table: 'pets',
        caseInsensitive: true,
        filter: (db, _, field) => {
          db.where('tenant_id', field.meta.tenantId)
          db.andWhere('client_id', field.data.clientId)
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
    private readonly getSpecies: GetSpecies,
    private readonly getClient: GetClient,
    private readonly createPet: CreatePet
  ) {}

  async render({ inertia, tenantId, request }: HttpContext) {
    const clientId = request.input('clientId', null)

    const [{ species }, { client }] = await Promise.all([
      this.getSpecies.execute(),
      clientId ? this.getClient.execute({ id: clientId, tenantId }) : { client: null },
    ])

    return inertia.render('pets/form', {
      client: ClientTransformer.transform(client) ?? undefined,
      species: SpeciesTransformer.transform(species),
    })
  }

  async execute({ request, response, tenantId, session }: HttpContext) {
    const payload = await request.validateUsing(CreatePetController.validator, { meta: { tenantId } })

    const { pet } = await withTransaction(() => {
      return this.createPet.execute({ ...payload, tenantId })
    })

    session.flash('petId', pet.id)

    return response.redirect().back()
  }
}
