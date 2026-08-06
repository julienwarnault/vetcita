import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { ScheduleService } from '#scheduling/services/schedule_service'
import { GetAppointments } from '#booking/queries/get_appointments'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import { GetService } from '#services/queries/get_service'
import { GetShifts } from '#scheduling/queries/get_shifts'
import type { UUID } from '#shared/types'

interface GetBookableSlotsParams {
  tenantId: UUID
  serviceId: UUID
  date: string
  appointmentId?: UUID
}

@inject()
export class GetBookableSlots {
  constructor(
    private readonly getService: GetService,
    private readonly getShifts: GetShifts,
    private readonly getAppointments: GetAppointments,
    private readonly scheduleService: ScheduleService
  ) {}

  async execute(params: GetBookableSlotsParams) {
    const day = DateTime.fromISO(params.date, { zone: DEFAULT_TIMEZONE })

    const { service } = await this.getService.execute({
      id: params.serviceId,
      tenantId: params.tenantId,
    })

    const agendaIds = service.agendas.map((agenda) => agenda.id)
    if (agendaIds.length === 0) return { slots: [] }

    const [{ shifts }, { appointments }] = await Promise.all([
      this.getShifts.execute({ tenantId: params.tenantId, agendaIds, from: day, to: day }),
      this.getAppointments.execute({ tenantId: params.tenantId, agendaIds, from: day, to: day }),
    ])

    const availability = this.scheduleService.getBookableSlots({
      from: day,
      to: day,
      duration: service.duration,
      agendaIds,
      shifts,
      appointments: appointments.filter(({ id }) => id !== params.appointmentId),
    })

    const slots = (availability.get(params.date) ?? []).map((slot) => ({
      agendaId: slot.agendaId,
      availableAgendaIds: slot.availableAgendaIds,
      time: slot.start.toFormat('hh:mma').toLowerCase(),
      at: slot.start.toISO()!,
    }))

    return { slots }
  }
}
