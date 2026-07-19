import { type DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { ShiftBuilder } from '#scheduling/services/shift_builder'
import WorkingHour from '#scheduling/models/working_hour'
import ClosedDate from '#scheduling/models/closed_date'
import TimeOff from '#scheduling/models/time_off'
import Agenda from '#agendas/models/agenda'
import type { UUID } from '#shared/types'

interface GetShiftsParams {
  tenantId: UUID
  from: DateTime
  to: DateTime
  agendaIds?: UUID[]
}

@inject()
export class GetShifts {
  constructor(private readonly shiftBuilder: ShiftBuilder) {}

  async execute(params: GetShiftsParams) {
    const agendas = await Agenda.query()
      .where('tenant_id', params.tenantId)
      .if(params.agendaIds, (q) => q.whereIn('id', params.agendaIds!))
      .orderBy('name')

    const agendaIds = agendas.map((agenda) => agenda.id)

    const workingHours = await WorkingHour.query()
      .where('tenant_id', params.tenantId)
      .whereIn('agenda_id', agendaIds)
      .orderBy('agenda_id')
      .orderBy('day_of_week')
      .orderBy('start_time')

    const closedDates = await ClosedDate.query()
      .where('tenant_id', params.tenantId)
      .where('start', '<=', params.to.toJSDate())
      .where('end', '>=', params.from.toJSDate())
      .orderBy('start')

    const timeOffs = await TimeOff.query()
      .where('tenant_id', params.tenantId)
      .where('start', '<=', params.to.toJSDate())
      .where('end', '>=', params.from.toJSDate())
      .orderBy('start')

    const shifts = this.shiftBuilder.build({
      from: params.from,
      to: params.to,
      agendaIds: agendaIds,
      workingHours: workingHours,
      closedDates: closedDates,
      timeOffs: timeOffs,
    })

    return { shifts }
  }
}
