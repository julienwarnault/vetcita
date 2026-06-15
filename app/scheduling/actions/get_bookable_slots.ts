import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { GetAppointmentType } from '#appointment_types/queries/get_appointment_type'
import { ScheduleService } from '#scheduling/services/schedule_service'
import { GetWorkingHours } from '#scheduling/queries/get_working_hours'
import { DEFAULT_TIMEZONE } from '#app/shared/services/time_service'
import { GetAppointments } from '#booking/queries/get_appointments'
import type { UUID } from '#app/shared/types'

interface GetBookableSlotsParams {
  tenantId: UUID
  appointmentTypeId: UUID
  date: string
  appointmentId?: UUID
}

@inject()
export class GetBookableSlots {
  constructor(
    private readonly getAppointmentType: GetAppointmentType,
    private readonly getWorkingHours: GetWorkingHours,
    private readonly getAppointments: GetAppointments,
    private readonly scheduleService: ScheduleService
  ) {}

  async execute(params: GetBookableSlotsParams) {
    const day = DateTime.fromISO(params.date, { zone: DEFAULT_TIMEZONE })

    const { appointmentType } = await this.getAppointmentType.execute({
      id: params.appointmentTypeId,
      tenantId: params.tenantId,
    })

    const agendaIds = appointmentType.agendas.map((agenda) => agenda.id)
    if (agendaIds.length === 0) return { slots: [] }

    const [{ workingHours }, { appointments }] = await Promise.all([
      this.getWorkingHours.execute({ tenantId: params.tenantId, agendaIds }),
      this.getAppointments.execute({ tenantId: params.tenantId, agendaIds, from: day, to: day }),
    ])

    const availability = this.scheduleService.getBookableSlots({
      from: day,
      to: day,
      duration: appointmentType.duration,
      agendaIds,
      workingHours,
      appointments: appointments.filter(({ id }) => id !== params.appointmentId),
    })

    const slots = (availability.get(params.date) ?? []).map((slot) => ({
      agendaId: slot.agendaId,
      time: slot.start.toFormat('hh:mma').toLowerCase(),
      at: slot.start.toISO()!,
    }))

    return { slots }
  }
}
