import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { GetLastAppointmentsUpdated } from '#booking/queries/get_last_appointments_updated'
import { GetDashboardTopServices } from '#booking/queries/get_dashboard_top_services'
import { GetUpcomingAppointments } from '#booking/queries/get_upcoming_appointments'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { GetTodayAppointments } from '#booking/queries/get_today_appointments'
import { GetDashboardStats } from '#booking/queries/get_dashboard_stats'

@inject()
export default class DashboardController {
  constructor(
    private readonly getLastAppointmentsUpdated: GetLastAppointmentsUpdated,
    private readonly getTodayAppointments: GetTodayAppointments,
    private readonly getUpcomingAppointments: GetUpcomingAppointments,
    private readonly getDashboardStats: GetDashboardStats,
    private readonly getDashboardTopServices: GetDashboardTopServices
  ) {}

  async render({ inertia, tenantId }: HttpContext) {
    const [
      { appointments: lastUpdated },
      { appointments: todayAppointments },
      { upcoming },
      { stats },
      { topServices },
    ] = await Promise.all([
      this.getLastAppointmentsUpdated.execute({ tenantId, limit: 40 }),
      this.getTodayAppointments.execute({ tenantId, limit: 40 }),
      this.getUpcomingAppointments.execute({ tenantId }),
      this.getDashboardStats.execute({ tenantId }),
      this.getDashboardTopServices.execute({ tenantId }),
    ])

    return inertia.render('dashboard', {
      stats,
      topServices,
      lastUpdated: AppointmentTransformer.transform(lastUpdated),
      todayAppointments: AppointmentTransformer.transform(todayAppointments),
      upcoming: upcoming,
    })
  }
}
