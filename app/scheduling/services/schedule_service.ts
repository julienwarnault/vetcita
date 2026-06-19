import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { TimeService } from '#shared/services/time_service'
import WorkingHour from '#scheduling/models/working_hour'
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
  workingHours: WorkingHour[]
  appointments: Appointment[]
}

interface IsSlotBookableParams {
  agendaId: UUID
  start: DateTime
  duration: number
  workingHours: WorkingHour[]
  appointments: Appointment[]
}

export type BookableSlotsByDate = Map<string, BookableSlot[]>

@inject()
export class ScheduleService {
  constructor(private readonly timeService: TimeService) {}

  getBookableSlots(params: GetBookableSlotsParams): BookableSlotsByDate {
    if (params.duration <= 0 || params.agendaIds.length === 0) return new Map()

    const availabilityPeriods = this.#getAvailabilityPeriods(params.workingHours, params.from, params.to)

    if (availabilityPeriods.length === 0) return new Map()

    const allSlots = this.#generateSlots(
      availabilityPeriods,
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

    const periods = this.#getAvailabilityPeriods(params.workingHours, params.start, params.start)
    const withinWorkingHours = periods.some(
      (period) => period.agendaId === params.agendaId && params.start >= period.start && end <= period.end
    )

    if (!withinWorkingHours) return false

    return this.#isSlotAvailable(params.start, end, this.#buildBlockingPeriods(params.appointments))
  }

  #getAvailabilityPeriods(workingHours: WorkingHour[], from: DateTime, to: DateTime): TimePeriod[] {
    const periods: TimePeriod[] = []
    let cursor = from.startOf('day')

    while (cursor <= to.startOf('day')) {
      const todayHours = workingHours.filter((wh) => wh.dayOfWeek === cursor.weekday)

      for (const wh of todayHours) {
        const [startH, startM] = wh.startTime.split(':').map(Number)
        const [endH, endM] = wh.endTime.split(':').map(Number)

        periods.push({
          agendaId: wh.agendaId,
          start: cursor.set({ hour: startH, minute: startM, second: 0, millisecond: 0 }),
          end: cursor.set({ hour: endH, minute: endM, second: 0, millisecond: 0 }),
        })
      }

      cursor = cursor.plus({ days: 1 })
    }

    return periods
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
