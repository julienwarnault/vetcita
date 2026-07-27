import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { ScheduleService } from '#scheduling/services/schedule_service'
import { GetAppointments } from '#booking/queries/get_appointments'
import { GetService } from '#services/queries/get_service'
import { GetShifts } from '#scheduling/queries/get_shifts'
import type { UUID } from '#shared/types'

interface CheckSlotBookableParams {
  tenantId: UUID
  serviceId: UUID
  agendaId: UUID
  start: DateTime
  appointmentId?: UUID
}

@inject()
export class CheckSlotBookable {
  constructor(
    private readonly getService: GetService,
    private readonly getShifts: GetShifts,
    private readonly getAppointments: GetAppointments,
    private readonly scheduleService: ScheduleService
  ) {}

  async execute(params: CheckSlotBookableParams) {
    const { service } = await this.getService.execute({
      id: params.serviceId,
      tenantId: params.tenantId,
    })

    if (!service.agendas.some((agenda) => agenda.id === params.agendaId)) {
      return false
    }

    const from = params.start.startOf('day')
    const to = params.start.endOf('day')

    const [{ shifts }, { appointments }] = await Promise.all([
      this.getShifts.execute({ tenantId: params.tenantId, agendaIds: [params.agendaId], from, to }),
      this.getAppointments.execute({ tenantId: params.tenantId, agendaIds: [params.agendaId], from, to }),
    ])

    const isBookable = this.scheduleService.isSlotBookable({
      agendaId: params.agendaId,
      start: params.start,
      duration: service.duration,
      shifts,
      appointments: appointments.filter(({ id }) => id !== params.appointmentId),
    })

    return isBookable
  }
}
