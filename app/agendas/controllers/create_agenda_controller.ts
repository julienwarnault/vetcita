import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ServiceTransformer from '#services/transformers/service_transformer'
import { withTransaction } from '#shared/utils/with_transaction'
import { CreateAgenda } from '#agendas/actions/create_agenda'
import { GetServices } from '#services/queries/get_services'
import { emailSchema, uuidSchema } from '#shared/validators'
import { UUID } from '#shared/types'

@inject()
export default class CreateAgendaController {
  static validator = vine.withMetaData<{ tenantId: UUID }>().create(
    vine.object({
      firstName: vine.string(),
      lastName: vine.string().optional(),
      phone: vine.string().phone().nullable().optional(),
      email: emailSchema()
        .unique({
          table: 'agendas',
          caseInsensitive: true,
          filter: (db, _, field) => {
            db.where('tenant_id', field.meta.tenantId)
          },
        })
        .optional()
        .requiredWhen('role', '!=', 'none'),
      role: vine.enum(['owner', 'admin', 'staff', 'none']),
      color: vine.string(),
      serviceIds: vine.array(uuidSchema()).optional(),
    })
  )

  constructor(
    private readonly getServices: GetServices,
    private readonly createAgenda: CreateAgenda
  ) {}

  async render({ inertia, tenantId }: HttpContext) {
    const { services } = await this.getServices.execute({ tenantId })

    return inertia.render('agendas/form', {
      services: ServiceTransformer.transform(services),
    })
  }

  async execute({ request, response, tenantId, auth }: HttpContext) {
    const payload = await request.validateUsing(CreateAgendaController.validator, { meta: { tenantId } })

    await withTransaction(() => {
      return this.createAgenda.execute({
        ...payload,
        tenantId,
        invitedByUserId: auth.user!.id,
      })
    })

    return response.redirect().back()
  }
}
