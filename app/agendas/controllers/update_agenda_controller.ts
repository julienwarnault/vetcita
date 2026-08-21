import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ServiceTransformer from '#services/transformers/service_transformer'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { withTransaction } from '#shared/utils/with_transaction'
import { UpdateAgenda } from '#agendas/actions/update_agenda'
import { emailSchema, uuidSchema } from '#shared/validators'
import { GetServices } from '#services/queries/get_services'
import { GetAgenda } from '#agendas/queries/get_agenda'
import { UUID } from '#shared/types'

@inject()
export default class UpdateAgendaController {
  static validator = vine.withMetaData<{ tenantId: UUID; agendaId: UUID }>().create(
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
            db.andWhereNot('id', field.meta.agendaId)
          },
        })
        .optional()
        .requiredWhen('role', '!=', 'none'),
      role: vine.enum(['owner', 'staff', 'none']),
      color: vine.string(),
      serviceIds: vine.array(uuidSchema()).optional(),
    })
  )

  constructor(
    private readonly getServices: GetServices,
    private readonly getAgenda: GetAgenda,
    private readonly updateAgenda: UpdateAgenda
  ) {}

  async render({ inertia, params, tenantId }: HttpContext) {
    const { services } = await this.getServices.execute({ tenantId })
    const { agenda } = await this.getAgenda.execute({ tenantId, id: params.id })

    return inertia.render('agendas/form', {
      agenda: AgendaTransformer.transform(agenda),
      services: ServiceTransformer.transform(services),
    })
  }

  async execute({ request, params, response, tenantId, auth }: HttpContext) {
    const payload = await request.validateUsing(UpdateAgendaController.validator, {
      meta: { tenantId, agendaId: params.id },
    })

    await withTransaction(() => {
      return this.updateAgenda.execute({
        id: params.id,
        tenantId,
        invitedByUserId: auth.user!.id,
        ...payload,
      })
    })

    return response.redirect().back()
  }
}
