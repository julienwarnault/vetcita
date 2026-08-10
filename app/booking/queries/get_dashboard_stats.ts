import type { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { AppointmentStatus } from '#appointment_workflow/enums/appointment_status'
import Appointment, { BookingMode } from '#booking/models/appointment'
import { TimeService } from '#shared/services/time_service'
import type { UUID } from '#shared/types'

interface GetDashboardStatsParams {
  tenantId: UUID
}

@inject()
export class GetDashboardStats {
  constructor(private readonly timeService: TimeService) {}

  async execute(params: GetDashboardStatsParams) {
    const now = this.timeService.now()

    const [today, thisMonth, noShowsThisMonth, onlineThisMonth] = await Promise.all([
      this.#countAppointments({
        tenantId: params.tenantId,
        from: now.startOf('day'),
        to: now.endOf('day'),
        excludedStatus: AppointmentStatus.CANCELLED,
      }),
      this.#countAppointments({
        tenantId: params.tenantId,
        from: now.startOf('month'),
        to: now.endOf('month'),
        excludedStatus: AppointmentStatus.CANCELLED,
      }),
      this.#countAppointments({
        tenantId: params.tenantId,
        from: now.startOf('month'),
        to: now.endOf('month'),
        status: AppointmentStatus.NO_SHOW,
      }),
      this.#countAppointments({
        tenantId: params.tenantId,
        from: now.startOf('month'),
        to: now.endOf('month'),
        excludedStatus: AppointmentStatus.CANCELLED,
        bookingMode: 'web',
      }),
    ])

    return {
      stats: {
        today,
        thisMonth,
        noShowsThisMonth,
        onlineThisMonth,
      },
    }
  }

  async #countAppointments(params: {
    tenantId: UUID
    from: DateTime
    to: DateTime
    status?: AppointmentStatus
    excludedStatus?: AppointmentStatus
    bookingMode?: BookingMode
  }) {
    const query = Appointment.query()
      .where('tenant_id', params.tenantId)
      .where('start_date', '>=', params.from.toUTC().toISO()!)
      .where('start_date', '<=', params.to.toUTC().toISO()!)

    if (params.status) {
      query.where('status_id', params.status)
    }

    if (params.excludedStatus) {
      query.whereNot('status_id', params.excludedStatus)
    }

    if (params.bookingMode) {
      query.where('booking_mode', params.bookingMode)
    }

    const result = await query.count('* as total').first()

    return Number(result?.$extras.total ?? 0)
  }
}
