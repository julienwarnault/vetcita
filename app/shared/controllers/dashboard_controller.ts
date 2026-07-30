import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { GetLastAppointmentsUpdated } from '#booking/queries/get_last_appointments_updated'
import { GetUpcomingAppointments } from '#booking/queries/get_upcoming_appointments'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { GetTodayAppointments } from '#booking/queries/get_today_appointments'

@inject()
export default class DashboardController {
  constructor(
    private readonly getLastAppointmentsUpdated: GetLastAppointmentsUpdated,
    private readonly getTodayAppointments: GetTodayAppointments,
    private readonly getUpcomingAppointments: GetUpcomingAppointments
  ) {}

  async render({ inertia, tenantId }: HttpContext) {
    const [{ appointments: lastUpdated }, { appointments: todayAppointments }, { upcoming }] = await Promise.all([
      this.getLastAppointmentsUpdated.execute({ tenantId, limit: 40 }),
      this.getTodayAppointments.execute({ tenantId, limit: 40 }),
      this.getUpcomingAppointments.execute({ tenantId }),
    ])

    return inertia.render('dashboard', {
      lastUpdated: AppointmentTransformer.transform(lastUpdated),
      todayAppointments: AppointmentTransformer.transform(todayAppointments),
      upcoming: upcoming,
    })
  }
}
