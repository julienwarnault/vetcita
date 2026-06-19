import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { GetAppointmentType } from '#appointment_types/queries/get_appointment_type'
import { ScheduleService } from '#scheduling/services/schedule_service'
import { GetWorkingHours } from '#scheduling/queries/get_working_hours'
import { GetAppointments } from '#booking/queries/get_appointments'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import type { UUID } from '#shared/types'

interface GetBookableDaysParams {
  tenantId: UUID
  appointmentTypeId: UUID
  from: string
  to: string
  appointmentId?: UUID
}

@inject()
export class GetBookableDays {
  constructor(
    private readonly getAppointmentType: GetAppointmentType,
    private readonly getWorkingHours: GetWorkingHours,
    private readonly getAppointments: GetAppointments,
    private readonly scheduleService: ScheduleService
  ) {}

  async execute(params: GetBookableDaysParams) {
    const from = DateTime.fromISO(params.from, { zone: DEFAULT_TIMEZONE })
    const to = DateTime.fromISO(params.to, { zone: DEFAULT_TIMEZONE })

    const { appointmentType } = await this.getAppointmentType.execute({
      id: params.appointmentTypeId,
      tenantId: params.tenantId,
    })

    const agendaIds = appointmentType.agendas.map((agenda) => agenda.id)
    if (agendaIds.length === 0) return { days: {} }

    const [{ workingHours }, { appointments }] = await Promise.all([
      this.getWorkingHours.execute({ tenantId: params.tenantId, agendaIds }),
      this.getAppointments.execute({ tenantId: params.tenantId, agendaIds, from, to }),
    ])

    const availability = this.scheduleService.getBookableSlots({
      from,
      to,
      duration: appointmentType.duration,
      agendaIds,
      workingHours,
      appointments: appointments.filter(({ id }) => id !== params.appointmentId),
    })

    const slots: Record<string, { available: boolean }> = Object.fromEntries(
      [...availability.entries()].map(([date, s]) => [date, { available: s.length > 0 }])
    )

    return { days: slots }
  }
}
