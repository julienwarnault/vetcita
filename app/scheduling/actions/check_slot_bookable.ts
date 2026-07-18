import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { GetAppointmentType } from '#appointment_types/queries/get_appointment_type'
import { ScheduleService } from '#scheduling/services/schedule_service'
import { GetAppointments } from '#booking/queries/get_appointments'
import { GetShifts } from '#scheduling/queries/get_shifts'
import type { UUID } from '#shared/types'

interface CheckSlotBookableParams {
  tenantId: UUID
  appointmentTypeId: UUID
  agendaId: UUID
  start: DateTime
  appointmentId?: UUID
}

@inject()
export class CheckSlotBookable {
  constructor(
    private readonly getAppointmentType: GetAppointmentType,
    private readonly getShifts: GetShifts,
    private readonly getAppointments: GetAppointments,
    private readonly scheduleService: ScheduleService
  ) {}

  async execute(params: CheckSlotBookableParams) {
    const { appointmentType } = await this.getAppointmentType.execute({
      id: params.appointmentTypeId,
      tenantId: params.tenantId,
    })

    if (!appointmentType.agendas.some((agenda) => agenda.id === params.agendaId)) {
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
      duration: appointmentType.duration,
      shifts,
      appointments: appointments.filter(({ id }) => id !== params.appointmentId),
    })

    return isBookable
  }
}
