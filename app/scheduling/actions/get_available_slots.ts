import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { DEFAULT_TIMEZONE } from '#app/shared/services/time_service'
import type { UUID } from '#app/shared/types'

const DAY_START_HOUR = 8
const DAY_END_HOUR = 19
const SLOT_MINUTES = 30

interface GetAvailableSlotsParams {
  tenantId: UUID
  date: string
}

@inject()
export class GetAvailableSlots {
  async execute(params: GetAvailableSlotsParams) {
    const day = DateTime.fromISO(params.date, { zone: DEFAULT_TIMEZONE })

    const dayStart = day.set({ hour: DAY_START_HOUR, minute: 0, second: 0, millisecond: 0 })
    const dayEnd = day.set({ hour: DAY_END_HOUR, minute: 0, second: 0, millisecond: 0 })

    const slots: { time: string; at: string }[] = []

    let cursor = dayStart
    while (cursor < dayEnd) {
      slots.push({ time: cursor.toFormat('hh:mma').toLowerCase(), at: cursor.toISO()! })
      cursor = cursor.plus({ minutes: SLOT_MINUTES })
    }

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return { slots }
  }
}
