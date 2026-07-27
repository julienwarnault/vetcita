import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ServiceTransformer from '#services/transformers/service_transformer'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import SpeciesTransformer from '#pets/transformers/species_transformer'
import { BookAppointment } from '#booking/actions/book_appointment'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetServices } from '#services/queries/get_services'
import { GetTenant } from '#tenants/queries/get_tenant'
import { GetSpecies } from '#pets/queries/get_species'
import { uuidSchema } from '#shared/validators'
import { UUID } from '#shared/types'

@inject()
export default class BookAppointmentController {
  static validator = vine.create(
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
    })
  )

  constructor(
    private readonly getTenant: GetTenant,
    private readonly getServices: GetServices,
    private readonly getSpecies: GetSpecies,
    private readonly bookAppointment: BookAppointment
  ) {}

  async render({ request, inertia }: HttpContext) {
    const id = request.param('tenantId')

    const { tenant } = await this.getTenant.execute({ id })
    const { services } = await this.getServices.execute({ tenantId: id })
    const { species } = await this.getSpecies.execute()

    return inertia.render('booking/form', {
      tenant: TenantTransformer.transform(tenant),
      services: ServiceTransformer.transform(services),
      species: SpeciesTransformer.transform(species),
    })
  }

  async execute({ request, response }: HttpContext) {
    const payload = await request.validateUsing(BookAppointmentController.validator)

    const id = request.param('tenantId') as UUID

    const { appointment } = await withTransaction(() => {
      return this.bookAppointment.execute({ ...payload, tenantId: id })
    })

    return response.redirect().toRoute('confirm_appointment.render', {
      appointmentId: appointment.id,
      tenantId: appointment.tenantId,
    })
  }
}
