import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { GetAvailableSlots } from '#scheduling/actions/get_available_slots'
import { DEFAULT_TIMEZONE } from '#app/shared/services/time_service'
import type { UUID } from '#app/shared/types'

const MAX_DAYS_LOOKAHEAD = 90

interface GetNextAvailableSlotParams {
  tenantId: UUID
  from?: string
}

@inject()
export class GetNextAvailableSlot {
  constructor(private readonly getAvailableSlots: GetAvailableSlots) {}

  async execute(params: GetNextAvailableSlotParams) {
    const start = params.from
      ? DateTime.fromISO(params.from, { zone: DEFAULT_TIMEZONE })
      : DateTime.now().setZone(DEFAULT_TIMEZONE)

    let day = start.startOf('day')
    const limit = day.plus({ days: MAX_DAYS_LOOKAHEAD })

    while (day <= limit) {
      const { slots } = await this.getAvailableSlots.execute({
        tenantId: params.tenantId,
        date: day.toISODate()!,
      })

      const upcoming = slots.filter((slot) => DateTime.fromISO(slot.at) > start)

      if (upcoming.length > 0) {
        return {
          date: day.toISODate()!,
          slot: upcoming[0],
        }
      }

      day = day.plus({ days: 1 })
    }

    return null
  }
}
