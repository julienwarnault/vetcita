import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { GetAppointmentType } from '#appointment_types/queries/get_appointment_type'
import { ScheduleService } from '#scheduling/services/schedule_service'
import { GetWorkingHours } from '#scheduling/queries/get_working_hours'
import { GetAppointments } from '#booking/queries/get_appointments'
import type { UUID } from '#app/shared/types'

interface CheckSlotBookableParams {
  tenantId: UUID
  appointmentTypeId: UUID
  agendaId: UUID
  start: DateTime
}

@inject()
export class CheckSlotBookable {
  constructor(
    private readonly getAppointmentType: GetAppointmentType,
    private readonly getWorkingHours: GetWorkingHours,
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

    const [{ workingHours }, { appointments }] = await Promise.all([
      this.getWorkingHours.execute({ tenantId: params.tenantId, agendaIds: [params.agendaId] }),
      this.getAppointments.execute({
        tenantId: params.tenantId,
        agendaIds: [params.agendaId],
        from: params.start.startOf('day'),
        to: params.start.endOf('day'),
      }),
    ])

    const isBookable = this.scheduleService.isSlotBookable({
      agendaId: params.agendaId,
      start: params.start,
      duration: appointmentType.duration,
      workingHours,
      appointments,
    })

    return isBookable
  }
}
