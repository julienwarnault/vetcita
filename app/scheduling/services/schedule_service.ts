import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { TimeService } from '#shared/services/time_service'
import { Shift } from '#scheduling/services/shift_builder'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

const SLOT_GRID_MINUTES = 15

interface TimePeriod {
  agendaId: UUID
  start: DateTime
  end: DateTime
}

interface BookableSlot {
  start: DateTime
  end: DateTime
  agendaId: UUID
}

interface GetBookableSlotsParams {
  from: DateTime
  to: DateTime
  duration: number
  agendaIds: UUID[]
  shifts: Shift[]
  appointments: Appointment[]
}

interface IsSlotBookableParams {
  agendaId: UUID
  start: DateTime
  duration: number
  shifts: Shift[]
  appointments: Appointment[]
}

export type BookableSlotsByDate = Map<string, BookableSlot[]>

@inject()
export class ScheduleService {
  constructor(private readonly timeService: TimeService) {}

  getBookableSlots(params: GetBookableSlotsParams): BookableSlotsByDate {
    if (params.duration <= 0 || params.agendaIds.length === 0 || params.shifts.length === 0) return new Map()

    const allSlots = this.#generateSlots(
      params.shifts,
      this.#buildBlockingPeriods(params.appointments),
      params.duration
    )

    return this.#groupByDate(
      this.#deduplicateByBestAgenda(allSlots, this.#buildLoadMap(params.agendaIds, params.appointments))
    )
  }

  isSlotBookable(params: IsSlotBookableParams): boolean {
    const end = params.start.plus({ minutes: params.duration })

    if (end <= this.timeService.now()) return false

    const withinWorkingHours = params.shifts.some(
      (shift) => shift.agendaId === params.agendaId && params.start >= shift.start && end <= shift.end
    )

    if (!withinWorkingHours) return false

    return this.#isSlotAvailable(params.start, end, this.#buildBlockingPeriods(params.appointments))
  }

  #buildBlockingPeriods(appointments: Appointment[]): TimePeriod[] {
    return appointments.map((appointment) => ({
      agendaId: appointment.agendaId,
      start: appointment.localStartDate,
      end: appointment.localEndDate,
    }))
  }

  #generateSlots(
    availabilityPeriods: TimePeriod[],
    blockingPeriods: TimePeriod[],
    duration: number
  ): Array<BookableSlot & { available: boolean }> {
    const slots: Array<BookableSlot & { available: boolean }> = []
    const now = this.timeService.now()

    for (const period of availabilityPeriods) {
      let cursor = period.start

      while (cursor.plus({ minutes: duration }) <= period.end) {
        const slotEnd = cursor.plus({ minutes: duration })

        if (cursor >= now) {
          const agendaBlocking = blockingPeriods.filter((b) => b.agendaId === period.agendaId)

          slots.push({
            start: cursor,
            end: slotEnd,
            agendaId: period.agendaId,
            available: this.#isSlotAvailable(cursor, slotEnd, agendaBlocking),
          })
        }

        cursor = cursor.plus({ minutes: SLOT_GRID_MINUTES })
      }
    }

    return slots
  }

  #deduplicateByBestAgenda(
    slots: Array<BookableSlot & { available: boolean }>,
    loadByAgenda: Map<UUID, number>
  ): BookableSlot[] {
    const best = new Map<string, BookableSlot>()

    for (const { available, ...slot } of slots) {
      if (!available) continue

      const key = slot.start.toFormat('yyyy-MM-dd HH:mm')
      const current = best.get(key)
      const slotLoad = loadByAgenda.get(slot.agendaId) ?? 0
      const currentLoad = current ? (loadByAgenda.get(current.agendaId) ?? 0) : Infinity

      if (slotLoad < currentLoad) best.set(key, slot)
    }

    return [...best.values()].sort((a, b) => a.start.toMillis() - b.start.toMillis())
  }

  #groupByDate(slots: BookableSlot[]): BookableSlotsByDate {
    const map: BookableSlotsByDate = new Map()

    for (const slot of slots) {
      const key = slot.start.toISODate()!
      const existing = map.get(key) ?? []
      existing.push(slot)
      map.set(key, existing)
    }

    return map
  }

  #buildLoadMap(agendaIds: UUID[], appointments: Appointment[]): Map<UUID, number> {
    const map = new Map<UUID, number>(agendaIds.map((id) => [id, 0]))

    for (const appointment of appointments) {
      map.set(appointment.agendaId, (map.get(appointment.agendaId) ?? 0) + 1)
    }

    return map
  }

  #isSlotAvailable(start: DateTime, end: DateTime, blockingPeriods: TimePeriod[]): boolean {
    return !blockingPeriods.some((block) => block.start < end && block.end > start)
  }
}
