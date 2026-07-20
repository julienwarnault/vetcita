import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import WorkingHourTransformer from '#scheduling/transformers/working_hour_transformer'
import { UpdateWorkingHours } from '#scheduling/actions/update_working_hours'
import AgendaTransformer from '#agendas/transformers/agenda_transformer'
import { GetWorkingHours } from '#scheduling/queries/get_working_hours'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetAgenda } from '#agendas/queries/get_agenda'

@inject()
export default class UpdateWorkingHoursController {
  static validator = vine.create(
    vine.object({
      weekShifts: vine
        .array(vine.array(vine.object({ startTime: vine.string(), endTime: vine.string() })))
        .fixedLength(7),
    })
  )

  constructor(
    private readonly getAgenda: GetAgenda,
    private readonly getWorkingHours: GetWorkingHours,
    private readonly updateWorkingHours: UpdateWorkingHours
  ) {}

  async render({ params, inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const [{ agenda }, { workingHours }] = await Promise.all([
      this.getAgenda.execute({ tenantId: user.tenantId, id: params.agendaId }),
      this.getWorkingHours.execute({ tenantId: user.tenantId, agendaIds: [params.agendaId] }),
    ])

    return inertia.render('shifts/working_hours_form', {
      agenda: AgendaTransformer.transform(agenda),
      workingHours: WorkingHourTransformer.transform(workingHours),
    })
  }

  async execute({ request, params, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const payload = await request.validateUsing(UpdateWorkingHoursController.validator)

    await withTransaction(() => {
      return this.updateWorkingHours.execute({ agendaId: params.agendaId, tenantId: user.tenantId, ...payload })
    })

    return response.redirect().back()
  }
}
