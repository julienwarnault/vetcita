import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { ScheduleService } from '#scheduling/services/schedule_service'
import { GetAppointments } from '#booking/queries/get_appointments'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import { GetService } from '#services/queries/get_service'
import { GetShifts } from '#scheduling/queries/get_shifts'
import type { UUID } from '#shared/types'

interface GetBookableDaysParams {
  tenantId: UUID
  serviceId: UUID
  from: string
  to: string
  appointmentId?: UUID
}

@inject()
export class GetBookableDays {
  constructor(
    private readonly getService: GetService,
    private readonly getShifts: GetShifts,
    private readonly getAppointments: GetAppointments,
    private readonly scheduleService: ScheduleService
  ) {}

  async execute(params: GetBookableDaysParams) {
    const from = DateTime.fromISO(params.from, { zone: DEFAULT_TIMEZONE })
    const to = DateTime.fromISO(params.to, { zone: DEFAULT_TIMEZONE })

    const { service } = await this.getService.execute({
      id: params.serviceId,
      tenantId: params.tenantId,
    })

    const agendaIds = service.agendas.map((agenda) => agenda.id)
    if (agendaIds.length === 0) return { days: {} }

    const [{ shifts }, { appointments }] = await Promise.all([
      this.getShifts.execute({ tenantId: params.tenantId, agendaIds, from, to }),
      this.getAppointments.execute({ tenantId: params.tenantId, agendaIds, from, to }),
    ])

    const availability = this.scheduleService.getBookableSlots({
      from,
      to,
      duration: service.duration,
      agendaIds,
      shifts,
      appointments: appointments.filter(({ id }) => id !== params.appointmentId),
    })

    const slots: Record<string, { available: boolean }> = Object.fromEntries(
      [...availability.entries()].map(([date, s]) => [date, { available: s.length > 0 }])
    )

    return { days: slots }
  }
}
