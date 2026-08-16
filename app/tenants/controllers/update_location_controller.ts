import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import LocationTransformer from '#tenants/transformers/location_transformer'
import SpeciesTransformer from '#pets/transformers/species_transformer'
import { UpdateLocation } from '#tenants/actions/update_location'
import { withTransaction } from '#shared/utils/with_transaction'
import { emailSchema, uuidSchema } from '#shared/validators'
import { GetLocation } from '#tenants/queries/get_location'
import { GetSpecies } from '#pets/queries/get_species'

@inject()
export default class UpdateLocationController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      phone: vine.string().phone(),
      email: emailSchema().optional(),
      website: vine.string().url({ require_protocol: false }).optional(),
      logo: vine.file({ size: '2mb', extnames: ['jpeg', 'jpg', 'png', 'webp'] }).optional(),
      cover: vine.file({ size: '5mb', extnames: ['jpeg', 'jpg', 'png', 'webp'] }).optional(),
      removeLogo: vine.boolean().optional(),
      removeCover: vine.boolean().optional(),
      address: vine.string().optional(),
      city: vine.string().optional(),
      state: vine.string().optional(),
      postalCode: vine.string().optional(),
      countryCode: vine.string().fixedLength(2).optional(),
      speciesIds: vine.array(uuidSchema()).minLength(1),
    })
  )

  constructor(
    private readonly getLocation: GetLocation,
    private readonly getSpecies: GetSpecies,
    private readonly updateLocation: UpdateLocation
  ) {}

  async render({ inertia, tenant, tenantId }: HttpContext) {
    const [{ location }, { species }] = await Promise.all([
      this.getLocation.execute({ id: tenant.location.id, tenantId }),
      this.getSpecies.execute(),
    ])

    return inertia.render('locations/form', {
      location: LocationTransformer.transform(location),
      species: SpeciesTransformer.transform(species),
    })
  }

  async execute({ request, response, tenant, tenantId }: HttpContext) {
    const payload = await request.validateUsing(UpdateLocationController.validator)

    await withTransaction(() => {
      return this.updateLocation.execute({ id: tenant.location.id, tenantId, ...payload })
    })

    return response.redirect().toRoute('show_settings.render')
  }
}
