import { inject } from '@adonisjs/core'
import { AppointmentStatus } from '#appointment_workflow/enums/appointment_status'
import { DEFAULT_TIMEZONE, TimeService } from '#shared/services/time_service'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

interface GetDashboardTopServicesParams {
  tenantId: UUID
  limit?: number
}

export interface DashboardTopService {
  serviceId: UUID
  serviceName: string
  thisMonth: number
  lastMonth: number
}

@inject()
export class GetDashboardTopServices {
  constructor(private readonly timeService: TimeService) {}

  async execute({ tenantId, limit = 5 }: GetDashboardTopServicesParams) {
    const now = this.timeService.now()
    const thisMonthStart = now.startOf('month')
    const thisMonthEnd = now.endOf('month')
    const lastMonthStart = now.minus({ months: 1 }).startOf('month')

    const appointments = await Appointment.query()
      .where('tenant_id', tenantId)
      .where('start_date', '>=', lastMonthStart.toUTC().toISO()!)
      .where('start_date', '<=', thisMonthEnd.toUTC().toISO()!)
      .whereNot('status_id', AppointmentStatus.CANCELLED)
      .preload('service')

    const services = appointments.reduce<Record<string, DashboardTopService>>((acc, appointment) => {
      const serviceId = appointment.serviceId
      const serviceName = appointment.service?.name ?? 'Servicio eliminado'
      const startDate = appointment.startDate.setZone(DEFAULT_TIMEZONE)

      acc[serviceId] ??= {
        serviceId,
        serviceName,
        thisMonth: 0,
        lastMonth: 0,
      }

      if (startDate >= thisMonthStart && startDate <= thisMonthEnd) {
        acc[serviceId].thisMonth += 1
      } else {
        acc[serviceId].lastMonth += 1
      }

      return acc
    }, {})

    const topServices = Object.values(services)
      .sort(
        (a, b) => b.thisMonth - a.thisMonth || b.lastMonth - a.lastMonth || a.serviceName.localeCompare(b.serviceName)
      )
      .slice(0, limit)

    return { topServices }
  }
}
