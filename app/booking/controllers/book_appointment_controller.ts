import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import LocationTransformer from '#tenants/transformers/location_transformer'
import ServiceTransformer from '#services/transformers/service_transformer'
import { GetLocationBySlug } from '#tenants/queries/get_location_by_slug'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import { GetLocationSpecies } from '#pets/queries/get_location_species'
import SpeciesTransformer from '#pets/transformers/species_transformer'
import { BookAppointment } from '#booking/actions/book_appointment'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetServices } from '#services/queries/get_services'
import { GetTenant } from '#tenants/queries/get_tenant'
import { uuidSchema } from '#shared/validators'

@inject()
export default class BookAppointmentController {
  static validator = vine.withMetaData().create(
    vine.object({
      serviceId: uuidSchema(),
      agendaId: uuidSchema(),
      startDate: vine.string(),
      firstName: vine.string(),
      lastName: vine.string(),
      phone: vine.string().phone(),
      email: vine.string().email(),
      petName: vine.string(),
      petSpeciesId: uuidSchema(),
      tenantId: uuidSchema(),
      locationId: uuidSchema(),

      params: vine.object({
        slug: vine.string().exists({
          table: 'locations',
          filter(db, _, field) {
            db.where('id', field.data.locationId)
            db.where('tenant_id', field.data.tenantId)
          },
        }),
      }),
    })
  )

  constructor(
    private readonly getTenant: GetTenant,
    private readonly getLocationBySlug: GetLocationBySlug,
    private readonly getServices: GetServices,
    private readonly getLocationSpecies: GetLocationSpecies,
    private readonly bookAppointment: BookAppointment
  ) {}

  async render({ request, inertia }: HttpContext) {
    const slug = request.param('slug', null)

    const { location } = await this.getLocationBySlug.execute({ slug })

    const [{ tenant }, { services }, { species }] = await Promise.all([
      this.getTenant.execute({ id: location.tenantId }),
      this.getServices.execute({ tenantId: location.tenantId }),
      this.getLocationSpecies.execute({ tenantId: location.tenantId, locationId: location.id }),
    ])

    return inertia.render('booking/form', {
      tenant: TenantTransformer.transform(tenant),
      location: LocationTransformer.transform(location),
      services: ServiceTransformer.transform(services),
      species: SpeciesTransformer.transform(species),
    })
  }

  async execute({ request, response }: HttpContext) {
    const slug = request.param('slug', null)

    const payload = await request.validateUsing(BookAppointmentController.validator)

    const { appointment } = await withTransaction(() => {
      return this.bookAppointment.execute({ ...payload })
    })

    return response.redirect().toRoute('confirm_appointment.render', {
      appointmentId: appointment.id,
      slug,
    })
  }
}
