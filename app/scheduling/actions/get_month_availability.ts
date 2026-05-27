import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { DEFAULT_TIMEZONE } from '#app/shared/services/time_service'
import type { UUID } from '#app/shared/types'

interface GetMonthAvailabilityParams {
  tenantId: UUID
  date: string
}

interface DayAvailability {
  available: boolean
}

@inject()
export class GetMonthAvailability {
  async execute(params: GetMonthAvailabilityParams) {
    const date = DateTime.fromISO(params.date, { zone: DEFAULT_TIMEZONE })

    const startOfMonth = date.startOf('month')
    const endOfMonth = date.endOf('month')

    const days: Record<string, DayAvailability> = {}

    let day = startOfMonth
    while (day <= endOfMonth) {
      days[day.toISODate()!] = {
        available: !this.#isClosed(day),
      }
      day = day.plus({ days: 1 })
    }

    return {
      month: startOfMonth.toFormat('yyyy-MM'),
      days,
    }
  }

  #isClosed(day: DateTime): boolean {
    const isEvenMonth = day.month % 2 === 0
    const weekend = day.weekday === 6 || day.weekday === 7

    if (isEvenMonth) {
      return day.weekday === 3 || weekend
    }
    return weekend
  }
}
